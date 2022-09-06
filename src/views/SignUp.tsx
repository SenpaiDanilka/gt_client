import { useMutation, gql } from "@apollo/client";
import { MouseEvent, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SIGNUP = gql`
  mutation UserSignUp( $name: String!, $email: String!, $password: String! ) {
    registerUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

export default function SignUp() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  interface State {
    password: string;
    showPassword: boolean;
  }

  const handleChange =
     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
       setValues({ ...values, [prop]: event.target.value });
     };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const [signUpFunc, { loading, error }] = useMutation(SIGNUP)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const doRegister = (e: MouseEvent) => {
    e.preventDefault();
    signUpFunc({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
        }
    })
    .then(resp => console.log('==>', resp))
    .catch(e => console.log(e))   
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Name"
      />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="email"
      />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" onClick={doRegister}>Contained</Button>
    </Box>
  )
}