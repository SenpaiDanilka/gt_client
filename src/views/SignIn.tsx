import BaseForm from "./../components/BaseComponents/BaseForm";
import React, {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import useForm from "../hooks/useForm";
import PasswordVisibilityButton from "../components/PasswordVisibilityButton";
import {useTranslation} from "react-i18next";
import BaseButton from "../components/BaseComponents/BaseButton";
import {isRequired, isValidEmail, minLength} from "../utils/validate";
import Cookie from "js-cookie";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {Link, useNavigate} from "react-router-dom";
import {useLoading} from "../contexts/LoadingContext";

const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      ttl
      secret
      email
      userId
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

const formFieldsRules = {
  email: [
    (v: string) => isRequired(v),
    (v: string) => isValidEmail(v)
  ],
  password: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 6)
  ]
};

const SignIn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginFunc, {data, loading}] = useMutation(LOGIN);
  const {t} = useTranslation('common');
  const navigate = useNavigate()
  const {setLoading, setAlertData} = useLoading();

  useEffect(() => {
    if (data) {
      Cookie.set(
        'fauna-session',
        JSON.stringify(data.login.secret),
        {expires: data.ttl}
      )
      localStorage.setItem("userId", data.login.userId)
      navigate('/')
    }
  }, [data]);

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);

  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    Cookie.remove('fauna-session')
    !isNotValidData && loginFunc({
      variables: {
        email: formData.email.value,
        password: formData.password.value
      }
    }).catch(e => {
      console.log(e);
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    });
  }

  const {
    formData,
    isNotValidData,
    handleBlur,
    handleChange,
    handleKeyPress
  } = useForm({
    initialState,
    onSubmit: doLogin,
    rules: formFieldsRules
  });

  const formFieldsData = [
    {
      id: 'email',
      rules: formFieldsRules['email'],
      autofocus: true,
      data: formData.email
    },
    {
      id: 'password',
      rules: formFieldsRules['password'],
      type: passwordVisibility ? 'text' : 'password',
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
    <BaseContainer className="p-8">
      <p className="text-center font-bold text-2xl">{t('signIn')}</p>
      <div className="flex justify-center my-4">
        <span className="mr-2">{t('haveNoAccount')}</span>
        <Link
          to="/sign_up"
          className="text-blue-600 hover:underline"
        >
          {t('signUp')}
        </Link>
      </div>
      <BaseForm
        formFieldsData={formFieldsData}
        onSubmit={doLogin}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        controls={<Controls disabled={isNotValidData}/>}
        className="max-w-[360px] h-[220px]"
      />
    </BaseContainer>
  );
}

export default SignIn;

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
      {t('signIn')}
    </BaseButton>
  );
}