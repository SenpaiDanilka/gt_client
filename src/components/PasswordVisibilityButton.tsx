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
      size="small"
      edge="end"
      onClick={() => onClick(!visibility)}
    >
      {
        !visibility
          ? <VisibilityOffIcon fontSize="small" className="[&>*]:hover:fill-blue-600"/>
          : <VisibilityIcon fontSize="small" className="[&>*]:fill-blue-600"/>
      }
    </BaseButton>
  );
};

export default PasswordVisibilityButton;