import {UserType} from "../models/AuthModels";
import React from "react";
import BaseAvatar from "./BaseComponents/BaseAvatar";
import {ButtonGroup, Divider} from "@mui/material";
import BaseButton from "./BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import BaseContainer from "./BaseComponents/BaseContainer";

interface Props {
  user: UserType
}

const UserProfile: React.FC<Props> = ({
  user
}) => {
  const {t} = useTranslation('common');
  const buttonGroupButtons = ['items', 'spaces', 'contacts']
    .map((key) => {
      const counterKey = `${key}_count` as keyof UserType;
      return (
        <BaseButton
          variant="outlined"
          key={key}
          href={`${key}`}
        >
          {t(key) + ': ' + user[counterKey]}
        </BaseButton>
      );
    });

  return (
    <BaseContainer className="max-w-[700px]">
      <div className="flex items-center p-4">
        <BaseAvatar
          image={user.photo}
          alt={user.name}
          size={40}
          className="mr-2"
        />
        {user.name}
      </div>
      <Divider variant="middle" />
      <div className="flex justify-center">
        <ButtonGroup
          variant="outlined"
          className="p-4"
        >
          { buttonGroupButtons }
        </ButtonGroup>
      </div>
    </BaseContainer>
  );
}

export default UserProfile;