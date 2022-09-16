import {Navigate, Outlet, useRoutes} from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import LanguageSelect from "./components/LanguageSelect";
import React from "react";
import Items from "./views/Items";
import Spaces from "./views/Spaces";
import Contacts from "./views/Contacts";
import Item from "./views/Item";
import Space from "./views/Space";
import BaseButton from "./components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import Cookie from "js-cookie";
import Contact from "./views/Contact";

export default function App() {
  const {t} = useTranslation('common');
  const cookies = Cookie.get('fauna-session');
  //const cookies = true
  const logout = () => {
    Cookie.remove('fauna-session');
  };
  const UnLoggedLayout = () => {
    if (!!cookies) {
      return <Navigate to="/" />;
    }

    return (
      <div className="flex items-center bg-blue-600 w-screen h-screen">
        <Outlet />
        <div className="absolute bottom-4 right-4 [&>*]:bg-white [&>*]:h-8 [&>*]:w-16">
          <LanguageSelect />
        </div>
      </div>
    )
  }

  function LoggedLayout() {
    if (!cookies) {
      return <Navigate to="/sign_in" />;
    }

    return (
      <div className="w-screen h-screen bg-gray-100">
        <div className="bg-blue-600 h-[70px] w-screen flex items-center justify-end">
          {
            !!cookies && (
              <BaseButton
                variant="outlined"
                size="small"
                onClick={logout}
                className="bg-white"
              >
                {t('signOut')}
              </BaseButton>
            )
          }
          <div className="[&>*]:bg-white [&>*]:h-8 [&>*]:w-16 mx-4">
            <LanguageSelect />
          </div>
        </div>
        <Outlet />
      </div>
    );
  }

  const routes = useRoutes([
    {
      element: <UnLoggedLayout />,
      children: [
        {
          path: "/sign_up", element: <SignUp />
        },
        {
          path: "/sign_in", element: <SignIn />
        }
      ]
    },
    {
      element: <LoggedLayout />,
      children: [
        {
          path: "/", element: <Home />
        },
        {
          path: "/items",
          children: [
            { index: true, element: <Items /> },
            { path: ":id", element: <Item /> },
            { path: "new", element: <Item /> }
          ]
        },
        {
          path: "/spaces",
          children: [
            { index: true, element: <Spaces /> },
            { path: ":id", element: <Space /> },
            { path: "new", element: <Space /> }
          ]
        },
        {
          path: "/contacts",
          children: [
            { index: true, element: <Contacts /> },
            { path: ":id", element: <Contact /> },
          ]
        }
      ]
    }
  ]);

  return (
    <>
      { routes }
    </>
  );
}