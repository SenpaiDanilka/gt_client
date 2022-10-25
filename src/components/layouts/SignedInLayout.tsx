import {Link, Navigate, Outlet, useNavigate} from "react-router-dom";
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
    <div className="w-screen h-screen bg-gray-100 overflow-x-hidden">
      <div className="bg-blue-600 h-[70px] w-screen flex items-center justify-between">
        <NavBar />
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

function NavBar() {
  const navigationRoutes = [
    {
      path: "/",
      name: "Home",
      id: "home"
    },
    {
      path: "/items",
      name: "My items",
      id: "items"
    },
    {
      path: "/spaces",
      name: "My spaces",
      id: "spaces"
    },
    {
      path: "/contacts",
      name: "My contacts",
      id: "contacts"
    },
    {
      path: "/contact_requests",
      name: "Contact requests",
      id: "contact_requests"
    },
  ];

  return (
    <div
      className="flex flex-1 justify-center h-full divide-blue-800"
    >
      {
        navigationRoutes.map(route => (
          <Link
            key={route.id}
            className="border-blue-800 border-l-2 last:border-r-2 text-white hover:bg-blue-700 cursor-pointer w-[120px] text-center flex items-center justify-center"
            to={route.path}
          >
            { route.name }
          </Link>
        ))
      }
    </div>
  );
}

export default SignedInLayout;
