import BaseForm from "./../components/BaseComponents/BaseForm";
import React, {useEffect, useState} from "react";
import useForm from "../hooks/useForm";
import PasswordVisibilityButton from "../components/PasswordVisibilityButton";
import {useTranslation} from "react-i18next";
import BaseButton from "../components/BaseComponents/BaseButton";
import {isRequired, isValidEmail, minLength} from "../utils/validate";
import Cookie from "js-cookie";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {Link, useNavigate} from "react-router-dom";
import {useLoading} from "../contexts/LoadingContext";
import {useUserLoginMutation} from "../generated/apollo-functions";
import { useAuth0 } from '@auth0/auth0-react'

const initialState = {
  email: '',
  password: ''
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
  const [loginFunc, {data, loading}] = useUserLoginMutation();
  const {t} = useTranslation('common');
  const navigate = useNavigate()
  const {setLoading, setAlertData} = useLoading();

  useEffect(() => {
    if (data) {
      Cookie.set(
        'fauna-session',
        JSON.stringify(data.login!.secret),
        {expires: new Date(data.login!.ttl)}
      )
      localStorage.setItem("userId", data.login!.userId)
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

  const { loginWithRedirect, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    debugger
    getAccessTokenSilently().then((token) => {
      console.log(token)
    })
  }, [])

  return (
    <BaseContainer className="p-8 w-full max-w-[360px]">
      <p className="text-center font-bold text-2xl">{t('signIn')}</p>
      <div className="flex justify-center my-4">
        <span className="mr-2">{t('haveNoAccount')}</span>
        <Link
          to="/sign_up"
          className="text-blue hover:underline"
        >
          {t('signUp')}
        </Link>
      </div>
      <button onClick={loginWithRedirect}>login</button>
      {/* <BaseForm
        formFieldsData={formFieldsData}
        onSubmit={doLogin}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        controls={<Controls disabled={isNotValidData}/>}
        className="min-h-[220px]"
      /> */}
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