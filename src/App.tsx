import {Route, Routes} from "react-router-dom";
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

export default function App() {
  const {t} = useTranslation('common');
  const cookies = Cookie.get('fauna-session');
  const logout = () => {
    Cookie.remove('fauna-session');
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <Routes>
        <Route path="sign_up" element={<SignUp/>}/>
        <Route path="sign_in" element={<SignIn/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="items" element={<Items/>}/>
        <Route path="spaces" element={<Spaces/>}/>
        <Route path="contacts" element={<Contacts/>}/>
        <Route path="items/:id" element={<Item/>}/>
        <Route path="spaces/:id" element={<Space/>}/>
      </Routes>
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