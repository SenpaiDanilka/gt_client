import {Navigate, Outlet, useNavigate} from "react-router-dom";
import BaseMenu from "../BaseComponents/BaseMenu";
import LanguageSelect from "../LanguageSelect";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import { logout } from "../../services/AuthService";
import {AuthContext} from "../../App";

const SignedInLayout = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const cookies = useContext(AuthContext);

  if (!cookies) {
    return <Navigate to="/sign_in" />;
  }

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="bg-blue-600 h-[70px] w-screen flex items-center justify-end">
        <BaseMenu
          triggerBtnColor="text-white"
          options={
            [
              {
                children: <LanguageSelect />,
                id: 'langChange'
              },
              {
                children: t('settings'),
                id: 'settings',
                onClick: () => { navigate('/settings') }
              },
              {
                children: t('signOut'),
                id: 'signOut',
                onClick: () => logout(navigate)
              }
            ]
          } />
      </div>
      <Outlet />
    </div>
  );
}

export default SignedInLayout;
