import React, {useEffect, useState} from "react";
import BaseForm from "../components/BaseComponents/BaseForm";
import useForm from "../hooks/useForm";
import PasswordVisibilityButton from "../components/PasswordVisibilityButton";
import {useTranslation} from "react-i18next";
import BaseButton from "../components/BaseComponents/BaseButton";
import {isRequired, isValidEmail, maxLength, minLength} from "../utils/validate";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {Link, useNavigate} from "react-router-dom";
import {useUserSignUpMutation} from "../generated/apollo-functions";
import {useLoading} from "../contexts/LoadingContext";

const initialState = {
  name: '',
  email: '',
  password: ''
}

const formFieldsRules = {
  name: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 3),
    (v: string) => maxLength(v, 20)
  ],
  email: [
    (v: string) => isRequired(v),
    (v: string) => isValidEmail(v)
  ],
  password: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 6)
  ]
};

const SignUp = () => {
  const {setLoading, setAlertData} = useLoading();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    formData,
    isNotValidData,
    handleBlur,
    handleChange,
    handleKeyPress
  } = useForm({
    initialState,
    onSubmit: doRegister,
    rules: formFieldsRules
  });
  const [signUpFunc, {loading}] = useUserSignUpMutation();
  const {t} = useTranslation('common');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);

  function doRegister(e: React.FormEvent) {
    e.preventDefault();
    !isNotValidData && signUpFunc({
      variables: {
        name: formData.name.value,
        email: formData.email.value,
        password: formData.password.value
      }
    })
      .then(resp => {
        console.log('==>', resp);
        navigate('/sign_in', { replace: true });
      })
      .catch(e => {
        console.log(e);
        setAlertData({
          isOpen: true,
          text: 'Smth went wrong',
          type: 'error'
        });
      });
  }

  const formFieldsData = [
    {
      id: 'name',
      rules: formFieldsRules['name'],
      autofocus: true,
      data: formData.name
    },
    {
      id: 'email',
      rules: formFieldsRules['email'],
      data: formData.email
    },
    {
      id: 'password',
      type: passwordVisibility ? 'text' : 'password',
      rules: formFieldsRules['password'],
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
      <p className="text-center font-bold text-2xl">{t('signUp')}</p>
      <div className="flex justify-center my-4">
        <span className="mr-2">{t('haveAccount')}</span>
        <Link
          to="/sign_in"
          className="text-blue-600 hover:underline"
        >
          {t('signIn')}
        </Link>
      </div>
      <BaseForm
        formFieldsData={formFieldsData}
        onSubmit={doRegister}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        controls={<Controls disabled={isNotValidData}/>}
        className="max-w-[360px] h-[280px]"
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