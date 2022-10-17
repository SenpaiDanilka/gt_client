import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../hooks/useDebounce';
import {FC, useEffect, useState} from 'react';
import {GET_USER_CONTACTS} from '../services/UsersService'
import CircularProgress from '@mui/material/CircularProgress';
import {useLoading} from "../contexts/LoadingContext";
import {useCreateContactMutation, useFindUserByEmailLazyQuery} from "../generated/apollo-functions";
import {FindUserContactsByIdQuery} from "../generated/operations";

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
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<ResultsType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const userId = localStorage.getItem("userId");
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

  const addContact = async (option: ResultsType) => {
    await createContact({
      variables: {
        owner: userId!,
        user: option._id
      },
      update(cache, {data}) {
        const {findUserByID} = cache.readQuery<FindUserContactsByIdQuery>({
          query: GET_USER_CONTACTS,
          variables: {
            id: userId
          }
        }) || ({} as Partial<FindUserContactsByIdQuery>);
        cache.writeQuery({
          query: GET_USER_CONTACTS,
          variables: {
            id: userId
          },
          data: {
            findUserByID: {
              ...findUserByID,
              contacts: {
                ...findUserByID?.contacts,
                data: [
                  ...findUserByID!.contacts!.data,
                  data!.createContact
                ]
              }
            }
          }
        });
      },
      onQueryUpdated: () => {
        handleClose();
        setAlertData({
          isOpen: true,
          text: 'Contact has been added',
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
    <div className="w-[600px]">
      <Autocomplete
        filterOptions={(x) => x}
        freeSolo
        loading={isSearching}
        options={results}
        getOptionLabel={(option) => typeof option === 'object' ? option.name : ''}
        onInputChange={((e) => {
          const target = e.target as HTMLInputElement;
          return setSearchValue(target.value)
        })}
        onChange={(e, option: ResultsType | null | string) => addContact(option as ResultsType)}
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
    </div>
  )
}

export default AddContactModal