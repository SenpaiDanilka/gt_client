import BaseForm from "./../components/BaseComponents/BaseForm";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import useForm from "../hooks/useForm";
import PasswordVisibilityButton from "../components/PasswordVisibilityButton";
import {useTranslation} from "react-i18next";
import BaseButton from "../components/BaseComponents/BaseButton";
import {isRequired, isValidEmail, minLength} from "../utils/validate";

const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      ttl
      secret
      email
    }
  }
`;

const initialState = {
  email: {
    value: '',
      errors: []
  },
  password: {
    value: '',
      errors: []
  }
};

const SignIn = () => {
  const { formData, isNotValidData, handleBlur, handleFocus, handleChange } = useForm(initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginFunc, {loading, error}] = useMutation(LOGIN);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }


  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    !isNotValidData && loginFunc({
      variables: {
        email: formData.email.value,
        password: formData.password.value
      }
    })
      .then(resp => console.log('==>', resp))
      .catch(e => console.log(e))
  };

  const formFieldsData = [
    {
      id: 'email',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => isValidEmail(v)
      ],
      autofocus: true,
      data: formData.email
    },
    {
      id: 'password',
      type: passwordVisibility ? 'text' : 'password',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => minLength(v,6)
      ],
      iconEnd: (
        <PasswordVisibilityButton
          visibility={passwordVisibility}
          onClick={setPasswordVisibility}
        />
      ),
      data: formData.password
    }
  ];

  return (
    <div className="flex justify-center items-center bg-blue-600 w-screen h-screen">
      <BaseForm
        formFieldsData={formFieldsData}
        onSubmit={doLogin}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        controls={<Controls disabled={isNotValidData} />}
        className="w-[320px] h-[200px]"
      />
    </div>
  );
}

export default SignIn;

interface ControlsProps {
  disabled: boolean
}

const Controls: React.FC<ControlsProps> = ({ disabled }) => {
  const {t} = useTranslation('common');

  return (
    <BaseButton
      type="submit"
      variant="contained"
      size="medium"
      disabled={disabled}
    >
      {t('signIn')}
    </BaseButton>
  );
}