import {useRoutes} from "react-router-dom";
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
  const logout = () => {
    Cookie.remove('fauna-session');
  };
  const routes = useRoutes([
    {
      path: "/sign_up", element: <SignUp />
    },
    {
      path: "/sign_in", element: <SignIn />
    },
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
  ]);

  return (
    <div className="w-screen h-screen bg-gray-100">
      { routes }
      <LanguageSelect/>
      {
        !!cookies && (
          <BaseButton
            variant="outlined"
            size="small"
            onClick={logout}
            className="absolute bottom-4 left-4"
          >
            {t('signOut')}
          </BaseButton>
        )
      }

    </div>
  );
}