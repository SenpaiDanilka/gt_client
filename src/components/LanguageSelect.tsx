import {MenuItem, Select} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation('translation');
  const sx = {
    '& .MuiSelect-select ': {
      padding: '0 10px'
    }
  };

  return (
    <Select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      sx={sx}
      className="bg-white h-8 w-16"
    >
      <MenuItem value="ru">ru</MenuItem>
      <MenuItem value="en">en</MenuItem>
    </Select>
  );
}

export default LanguageSelect;