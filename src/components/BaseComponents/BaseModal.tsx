import React, {ReactNode} from "react";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

export interface BaseModalProps {
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={false}>
      <Box sx={{p: 2}}>
        {props.children}
      </Box>
    </Dialog>
  );
}

export default BaseModal