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

const BaseButton = React.forwardRef<HTMLButtonElement, Props>((
  {
    children,
    type,
    className,
    variant,
    size,
    onClick,
    disabled,
    buttonType,
    edge,
    href,
    ...props
  }, ref) => {
  const classList = () => {
    const initialClasses = `disabled:bg-unavaliable normal-case ${className || ''}`;
    const outlinedClasses = 'text-gb hover:text-blue dark:hover:text-white border border-br-stroke hover:border-blue dark:border-br-dark dark:hover:border-white';
    const containedClasses = 'text-white bg-blue hover:text-white';
    const iconButtonClasses = 'text-gb hover:text-blue dark:hover:text-white';

    if (variant === 'outlined') {
      return initialClasses.concat(' ', outlinedClasses);
    }

    if (variant === 'contained') {
      return initialClasses.concat(' ', containedClasses);
    }

    if (buttonType === 'icon') {
      return initialClasses.concat(' ', iconButtonClasses);
    }

    return initialClasses;
  };

  if (buttonType === "icon") {
    return (
      <IconButton
        ref={ref}
        size={size}
        edge={edge}
        onClick={onClick}
        className={classList()}
        {...props}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <Button
      ref={ref}
      href={href}
      type={type}
      variant={variant}
      size={size}
      className={classList()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
});

export default BaseButton;