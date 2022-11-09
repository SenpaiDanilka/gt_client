import BaseButton from "./BaseComponents/BaseButton";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {classNames} from "../utils/helpers";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  text?: string;
  variant?: "text" | "contained" | "outlined";
}

const AddButton = ({
  onClick,
  className,
  text,
  variant = 'contained'
}: Props) => {
  const classes = classNames(
    'text-white text-base rounded-md',
    variant === 'contained' && 'bg-blue',
    className
  );

  return (
    <BaseButton
      variant={variant}
      buttonType="icon"
      onClick={onClick}
      className={classes}
    >
      <AddIcon className="text-base" />
      {
        text && <span className="ml-2">{ text }</span>
      }
    </BaseButton>
  );
}

export default AddButton;