import React, {ReactNode} from "react";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import BaseButton from "./BaseButton";

export interface BaseModalProps {
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
    >
      <div className="relative">
        {props.children}
        {props.showCloseButton ? (
          <BaseButton
            buttonType="icon"
            onClick={handleClose}
            className="absolute top-1 right-1"
          >
            <CloseIcon />
          </BaseButton>
        ) : null}
      </div>
    </Dialog>
  );
}

export default BaseModal