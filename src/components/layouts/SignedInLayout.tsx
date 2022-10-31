import {Navigate, Outlet} from "react-router-dom";
import LanguageSelect from "../LanguageSelect";
import React, {useContext} from "react";
import {AuthContext} from "../../App";
import NavSideBar from "./NavSideBar";
import ThemeSwitcher from "../ThemeSwitcher";
import UserMenu from "../UserMenu";
import MenuIcon from '@mui/icons-material/Menu';
import BaseButton from "../BaseComponents/BaseButton";

const SignedInLayout = () => {
  const cookies = useContext(AuthContext);

  if (!cookies) {
    return <Navigate to="/sign_in" />;
  }

  const handleMenuToggle = () => {
    const menu = document.querySelector("#mobile-menu");
    menu!.classList.toggle('hidden');
  };

  return (
    <div className="w-screen h-screen bg-white overflow-x-hidden dark:bg-dark-bg flex">
      <div className="[&>:not(.hidden)]:fixed md:[&>:not(.hidden)]:static z-9999 md:z-0">
        <NavSideBar />
      </div>
      <div className="w-full">
        <div className="h-[80px] flex items-center justify-end py-5 px-5 md:px-10 space-x-10">
          <div className="flex-1">
            <BaseButton
              buttonType="icon"
              onClick={handleMenuToggle}
              className="text-gb hover:text-blue dark:hover:text-white md:hidden"
            >
              <MenuIcon />
            </BaseButton>
          </div>
          <LanguageSelect />
          <ThemeSwitcher />
          <UserMenu />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default SignedInLayout;
