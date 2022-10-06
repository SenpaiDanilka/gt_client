import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import {FIND_USER_BY_EMAIL} from '../services/UsersService'
import { useLazyQuery } from '@apollo/client';

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
    // Это массив зависимостей useEffect
    // Хук useEffect сработает только если отложенное значение изменится ...
    // ... и спасибо нашему хуку, что оно изменится только тогда ...
    // когда значение searchTerm не менялось на протяжении 500ms.
    [debouncedSearchTerm]
  );

  const [findUserByEmail] = useLazyQuery(FIND_USER_BY_EMAIL)

  return (
    <>
      <div>Input ur contact`s email</div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={results.map((option) => option.name)}
        onInputChange={((e: any) => setSearchValue(e.target.value))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="User email"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </>
  )
}

export default AddContactModal