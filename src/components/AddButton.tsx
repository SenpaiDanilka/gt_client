import BaseButton from "./BaseComponents/BaseButton";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {classNames} from "../utils/helpers";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  text?: string;
}

const AddButton = ({
  onClick,
  className,
  text
}: Props) => {
  const classes = classNames(
    'bg-blue text-white text-base rounded-md',
    className
  );

  return (
    <BaseButton
      variant="contained"
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