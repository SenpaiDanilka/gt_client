import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BaseButton from "./BaseButton";

interface Props {
  options: any[]
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
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
            children={option.children}
          />
        ))}
      </Menu>
    </div>
  );
}

export default BaseMenu;