import {Button, IconButton} from "@mui/material";
import React, {ReactNode} from "react";

interface Props {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  href?: string;
  edge?: false | "start" | "end";
  buttonType?: "loading" | "icon"; /*TODO loading btn isn't ready for the core mui lib */
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
  edge,
  href
}) => {
  if (buttonType === "icon") {
    return (
      <IconButton
        size={size}
        edge={edge}
        onClick={onClick}
        className={className}
      >
        { children }
      </IconButton>
    );
  }

  return (
    <Button
      href={href}
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