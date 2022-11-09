import {Navigate, Outlet} from "react-router-dom";
import LanguageSelect from "../LanguageSelect";
import React, {useContext} from "react";
import {AuthContext} from "../../App";
import ThemeSwitcher from "../ThemeSwitcher";

const SignedOutLayout = () => {
  const cookies = useContext(AuthContext);

  if (cookies) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="flex items-center bg-blue dark:bg-dark-bg w-screen h-screen">
      <Outlet/>
      <div className="absolute bottom-4 right-4">
        <ThemeSwitcher />
        <LanguageSelect/>
      </div>
    </div>
  )
}

export default SignedOutLayout;
