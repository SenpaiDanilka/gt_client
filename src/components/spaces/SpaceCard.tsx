import React from "react";
import {Space} from "../../generated/types";
import BaseAvatar from "../BaseComponents/BaseAvatar";
import Tooltip from "@mui/material/Tooltip";
import BaseButton from "../BaseComponents/BaseButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface Props {
  space: Partial<Space>;
  onDelete: () => void;
}

const SpaceCard: React.FC<Props> = ({
  space,
  onDelete
}) => {
  const {t} = useTranslation(['common']);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <Link
      to={`/spaces/${space!._id}`}
      className="w-[200px] h-[200px] shadow-card-shadow dark:bg-mgb rounded-lg p-5 relative"
    >
      <BaseAvatar
        size={50}
        variant="square"
        className="mb-4"
      />
      <div className="flex flex-col">
        <span className="text-xl text-mgb dark:text-white">{space!.name}</span>
        <span className="text-xs text-gb mb-1">{space!.description}</span>
        <div>
          {/*TODO mocked data*/}
          <span className="text-base text-gb mr-4">Items: 3</span>
          <span className="text-base text-gb">Users: 3</span>
        </div>
      </div>
      <Tooltip
        title={t('delete', { ns: 'common' })}
        className="absolute right-1 top-1"
      >
        <BaseButton
          buttonType="icon"
          size="small"
          className="text-gb hover:text-blue dark:hover:text-white"
          onClick={(e) =>handleDelete(e)}
        >
          <DeleteIcon className="text-3xl md:text-xl" />
        </BaseButton>
      </Tooltip>
    </Link>
  );
};

export default SpaceCard;