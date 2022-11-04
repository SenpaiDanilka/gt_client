import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BaseButton from "./BaseComponents/BaseButton";

interface PasswordIconProps {
  visibility: boolean;
  onClick: (val: boolean) => void;
}

const PasswordVisibilityButton: React.FC<PasswordIconProps> = ({
  visibility,
  onClick
}) => {
  return (
    <BaseButton
      buttonType="icon"
      onClick={() => onClick(!visibility)}
      className="text-gb hover:text-blue"
    >
      {
        !visibility
          ? <VisibilityOffIcon className="text-xl" />
          : <VisibilityIcon className="text-xl" />
      }
    </BaseButton>
  );
};

export default PasswordVisibilityButton;