import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState, MouseEvent} from "react";
import BaseButton from "./BaseComponents/BaseButton";
import LanguageIcon from '@mui/icons-material/Language';
import Menu from "@mui/material/Menu";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectClick = async (val: string) => {
    await i18n.changeLanguage(val);
    handleClose();
  };

  const menuItemClasses = (val: string) => {
    const baseStyles = 'rounded-lg m-2';
    const activeStyles = 'bg-blue text-white';
    const plainStyles = 'text-gb'

    if (val === i18n.language) {
      return baseStyles.concat(' ', activeStyles);
    }

    return baseStyles.concat(' ', plainStyles);
  };

  const MenuItems = () => {
    const arr = [
      {
        value: 'ru',
        label: 'Ru'
      },
      {
        value: 'en',
        label: 'En'
      }
    ];

    return arr.map((item) => (
      <MenuItem
        className={menuItemClasses(item.value)}
        onClick={() => handleSelectClick(item.value)}
        key={item.value}
      >
        { item.label }
      </MenuItem>
    ));
  };

  return (
    <>
      <BaseButton
        buttonType="icon"
        onClick={handleClick}
        className="text-gb hover:text-blue dark:hover:text-white"
      >
        <LanguageIcon />
      </BaseButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        { MenuItems() }
      </Menu>
    </>
  );
}

export default LanguageSelect;