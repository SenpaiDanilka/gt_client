import BaseButton from "./BaseComponents/BaseButton";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {classNames} from "../utils/helpers";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string
}

const AddButton = ({
  onClick,
  className
}: Props) => {
  const classes = classNames(
    'bg-blue-600 hover:bg-blue-700 text-white rounded-md',
    className
  );

  return (
    <BaseButton
      variant="contained"
      buttonType="icon"
      onClick={onClick}
      className={classes}
    >
      <AddIcon fontSize="small"/>
    </BaseButton>
  );
}

export default AddButton;