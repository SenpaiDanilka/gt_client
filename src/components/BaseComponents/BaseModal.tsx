import React, {ReactNode} from "react";
import Dialog from '@mui/material/Dialog';

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
    <Dialog onClose={handleClose} open={open}>
      {props.children}
    </Dialog>
  );
}

export default BaseModal