import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import {FIND_USER_BY_EMAIL, CREATE_CONTACT} from '../services/UsersService'
import { useLazyQuery, useMutation } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

const AddContactModal = () => {
  const [searchValue, setSearchValue] = useState('');

  const [results, setResults] = useState<any[]>([]);

  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

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
  const addContact = (option: any) => {
    createContact({
      variables: {
        owner: localStorage.getItem("userId"),
        user: option._id
      }
    })
  }

  const [findUserByEmail] = useLazyQuery(FIND_USER_BY_EMAIL)

  const [createContact] = useMutation(CREATE_CONTACT)

  return (
    <Box sx={{width: '600px'}}>
      <Autocomplete
        id="free-solo-demo"
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