import BaseAvatar from "./BaseComponents/BaseAvatar";
import React, {MouseEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import BaseButton from "./BaseComponents/BaseButton";
import Menu from "@mui/material/Menu";
import {logout} from "../services/AuthService";
import {MenuItem} from "@mui/material";

const UserMenu = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuItems = () => {
    const arr = [
      {
        children: t('settings'),
        id: 'settings',
        onClick: () => {
          handleClose();
          navigate('/settings');
        }
      },
      {
        children: t('signOut'),
        id: 'signOut',
        onClick: () => logout(navigate)
      }
    ];
    return arr.map((item) => (
      <MenuItem
        onClick={item.onClick}
        key={item.id}
      >
        { item.children }
      </MenuItem>
    ));
  };

  return (
  <>
    <BaseButton
      buttonType="icon"
      onClick={handleClick}
    >
      <BaseAvatar size={40}/>
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
};

export default UserMenu;