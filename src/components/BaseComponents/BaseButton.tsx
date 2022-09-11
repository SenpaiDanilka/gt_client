import {Button, IconButton} from "@mui/material";
import React, {ReactNode} from "react";

interface Props {
  children: ReactNode,
  onClick?: () => void,
  className?: string,
  type?: "button" | "submit" | "reset",
  variant?: "text" | "contained" | "outlined",
  size?: "small" | "medium" | "large",
  disabled?: boolean,
  edge?: false | "start" | "end",
  buttonType?: "loading" | "icon" /*TODO loading btn isn't ready for the core mui lib */
}

const BaseButton: React.FC<Props> = ({
  children,
  type,
  className,
  variant,
  size,
  onClick,
  disabled,
  buttonType,
  edge
}) => {
  if (buttonType === "icon") {
    return (
      <IconButton
        size={size}
        edge={edge}
        onClick={onClick}
      >
        { children }
      </IconButton>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={'normal-case ' + className}
      onClick={onClick}
      disabled={disabled}
    >
      { children }
    </Button>
  );
}

export default BaseButton;