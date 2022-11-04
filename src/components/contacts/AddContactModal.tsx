import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../../hooks/useDebounce';
import {FC, useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useLoading} from "../../contexts/LoadingContext";
import {useCreateContactMutation, useFindUserByEmailLazyQuery} from "../../generated/apollo-functions";
import {GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables} from "../../generated/operations";
import {GET_SENT_CONTACT_REQUESTS} from "../../services/UsersService";
import {Contact} from "../../generated/types";
import BaseInput from "../BaseComponents/BaseInput";
import BaseButton from "../BaseComponents/BaseButton";

type ResultsType = {
  __typename?: "User";
  _id: string;
  name: string;
}

interface Props {
  handleClose: () => void;
}

const AddContactModal: FC<Props> = ({
  handleClose
}) => {
  const [selectedContact, setSelectedContact] = useState<ResultsType | null>(null);
  const [message, setMessage] = useState('');
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<ResultsType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const userId = localStorage.getItem('userId');
  const [findUserByEmail] = useFindUserByEmailLazyQuery();
  const [createContact, {loading}] = useCreateContactMutation();

  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        findUserByEmail({variables: {
          email: debouncedSearchTerm
        }}).then((results) => {
          // Выставить состояние в false, так-как запрос завершен
          setIsSearching(false);
          // Выставит состояние с результатом
          const array = results?.data?.findUserByEmail ? [results.data.findUserByEmail] : [];
          setResults(array);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);

  const handleSelectContact = (option: ResultsType) => {
    setSelectedContact(option);
  };

  const addContact = async () => {
    !!selectedContact && await createContact({
      variables: {
        user_one: userId!,
        user_two: selectedContact._id
      },
      update(cache, { data }) {
        const {getSentContactRequests} = cache.readQuery<GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables>({
          query: GET_SENT_CONTACT_REQUESTS,
          variables: {
            user_id: userId!
          }
        }) || ({} as Partial<GetSentContactRequestsQuery>);
        cache.writeQuery<GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables>({
          query: GET_SENT_CONTACT_REQUESTS,
          variables: {
            user_id: userId!
          },
          data: {
            getSentContactRequests: [...getSentContactRequests!, data!.createContact!]
          }
        });
      },
      onCompleted: () => {
        handleClose();
        setAlertData({
          isOpen: true,
          text: 'Request has been sent',
          type: 'success'
        });
      },
      onError: () => {
        setAlertData({
          isOpen: true,
          text: 'Smth went wrong',
          type: 'error'
        });
      }
    })
  }

  return (
    <div className="flex flex-col items-center min-w-[300px] md:min-w-[384px] h-[272px] px-10 py-5 relative">
      <p className="text-mgb text-xl font-semibold mb-1">Add a new Contact</p>
      <p className="text-base text-dgb mb-4">Send invitation email to your friend</p>
      <Autocomplete
        className="w-full mb-2"
        filterOptions={(x) => x}
        freeSolo
        loading={isSearching}
        options={results}
        getOptionLabel={(option) => typeof option === 'object' ? option.name : ''}
        onInputChange={((e) => {
          const target = e.target as HTMLInputElement;
          return setSearchValue(target.value)
        })}
        onChange={(e, option: ResultsType | null | string) => handleSelectContact(option as ResultsType)}
        renderInput={(params) =>
          <TextField
            {...params}
            label="User email"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        }
      />
      {/* TODO the input below doing nothing right now */}
      <BaseInput
        id="message"
        multiline
        minRows={2}
        maxRows={3}
        className="mb-5"
        inputClasses="rounded"
        placeholder="Enter a message"
        value={message}
        onChange={setMessage}
      />
      <BaseButton
        variant="contained"
        onClick={addContact}
      >
        Send
      </BaseButton>
    </div>
  )
}

export default AddContactModal