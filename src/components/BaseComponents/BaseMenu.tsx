import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BaseButton from "./BaseButton";
import {ReactNode} from "react";

interface Props {
  options: {
    id: string;
    children: ReactNode;
    onClick?: () => void;
  }[];
  triggerBtnColor?: string;
}

const BaseMenu: React.FC<Props> = ({
  options,
  triggerBtnColor
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <BaseButton
        buttonType="icon"
        onClick={handleOpen}
        className={triggerBtnColor}
      >
        <MoreVertIcon />
      </BaseButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              option.onClick?.();
              option.onClick && handleClose();
            }}
            children={option.children}
            className="justify-center"
          />
        ))}
      </Menu>
    </div>
  );
}

export default BaseMenu;