import BaseButton from "./BaseComponents/BaseButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import React, {useLayoutEffect, useState} from "react";
import {isDarkThemeCheck, themeSwitch} from "../utils/theme";

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useLayoutEffect(() => {
    setIsDarkTheme(isDarkThemeCheck);
  }, []);

  const handleThemeSwitch = () => {
    themeSwitch();
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <BaseButton
      buttonType="icon"
      onClick={handleThemeSwitch}
      className="text-gb hover:text-blue dark:hover:text-white"
    >
      {
        isDarkTheme
          ? <DarkModeOutlinedIcon />
          : <LightModeOutlinedIcon />
      }
    </BaseButton>
  );
}

export default ThemeSwitcher;