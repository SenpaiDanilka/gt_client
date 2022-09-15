import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";
import BaseForm from "../components/BaseComponents/BaseForm";
import useForm from "../hooks/useForm";
import PasswordVisibilityButton from "../components/PasswordVisibilityButton";
import {useTranslation} from "react-i18next";
import BaseButton from "../components/BaseComponents/BaseButton";
import {isRequired, isValidEmail, maxLength, minLength} from "../utils/validate";
import BaseContainer from "../components/BaseComponents/BaseContainer";

const SIGNUP = gql`
  mutation UserSignUp( $name: String!, $email: String!, $password: String! ) {
    registerUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

const initialState = {
  name: {
    value: '',
    errors: []
  },
  email: {
    value: '',
    errors: []
  },
  password: {
    value: '',
    errors: []
  }
}

const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {formData, isNotValidData, handleBlur, handleFocus, handleChange} = useForm(initialState);
  const [signUpFunc, {loading, error}] = useMutation(SIGNUP);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const doRegister = (e: React.FormEvent) => {
    e.preventDefault();
    !isNotValidData && signUpFunc({
      variables: {
        name: formData.name.value,
        email: formData.email.value,
        password: formData.password.value
      }
    })
      .then(resp => console.log('==>', resp))
      .catch(e => console.log(e))
  };

  const formFieldsData = [
    {
      id: 'name',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => minLength(v, 3),
        (v: string) => maxLength(v, 20)
      ],
      autofocus: true,
      data: formData.name
    },
    {
      id: 'email',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => isValidEmail(v)
      ],
      data: formData.email
    },
    {
      id: 'password',
      type: passwordVisibility ? 'text' : 'password',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => minLength(v, 6)
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
    <BaseContainer>
      <BaseForm
        formFieldsData={formFieldsData}
        onSubmit={doRegister}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        controls={<Controls disabled={isNotValidData}/>}
        className="w-[380px] h-[340px]"
      />
    </BaseContainer>
  );
}

export default SignUp;

interface ControlsProps {
  disabled: boolean
}

const Controls: React.FC<ControlsProps> = ({disabled}) => {
  const {t} = useTranslation('common');

  return (
    <BaseButton
      type="submit"
      variant="contained"
      size="medium"
      disabled={disabled}
    >
      {t('signUp')}
    </BaseButton>
  );
}