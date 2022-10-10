import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../hooks/useDebounce';
import {FC, useEffect, useState} from 'react';
import {FIND_USER_BY_EMAIL, CREATE_CONTACT, GET_USER_CONTACTS} from '../services/UsersService'
import {useLazyQuery, useMutation} from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {useLoading} from "../contexts/LoadingContext";

interface Props {
  handleClose: () => void;
}

const AddContactModal: FC<Props> = ({
  handleClose
}) => {
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const userId = localStorage.getItem("userId");
  const [findUserByEmail] = useLazyQuery(FIND_USER_BY_EMAIL);
  const [createContact, {loading}] = useMutation(CREATE_CONTACT);

  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        findUserByEmail({variables: {
          email: debouncedSearchTerm
        }}).then((results: any) => {
          // Выставить состояние в false, так-как запрос завершен
          setIsSearching(false);
          // Выставит состояние с результатом
          const array = results.data.findUserByEmail ? [results.data.findUserByEmail] : []
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

  const addContact = async (option: any) => {
    await createContact({
      variables: {
        owner: userId,
        user: option._id
      },
      update(cache, {data: {createContact}}) {
        const {findUserByID} = cache.readQuery<any>({
          query: GET_USER_CONTACTS,
          variables: {
            id: userId
          }
        });
        cache.writeQuery({
          query: GET_USER_CONTACTS,
          variables: {
            id: userId
          },
          data: {
            findUserByID: {
              ...findUserByID,
              contacts: {
                ...findUserByID.contacts,
                data: [
                  ...findUserByID.contacts.data,
                  createContact.user
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
    <Box sx={{width: '600px'}}>
      <Autocomplete
        filterOptions={(x) => x}
        freeSolo
        loading={isSearching}
        options={results}
        getOptionLabel={(option) => option.name}
        onInputChange={((e: any) => setSearchValue(e.target.value))}
        onChange={(e: any, option: string) => addContact(option)}
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
    </Box>
  )
}

export default AddContactModal