import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import BaseButton from "./BaseComponents/BaseButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FC} from "react";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  className?: string;
}

const EntityActions: FC<Props> = ({
  onDelete,
  onEdit,
  className
}) => {
  const {t} = useTranslation('common');

  return (
    <div className={className}>
      <Tooltip title={t('edit')}>
        <BaseButton
          buttonType="icon"
          variant="contained"
          size="medium"
          onClick={onEdit}
        >
          <EditIcon />
        </BaseButton>
      </Tooltip>
      <Tooltip title={t('delete')}>
        <BaseButton
          buttonType="icon"
          variant="contained"
          size="medium"
          onClick={onDelete}
        >
          <DeleteIcon />
        </BaseButton>
      </Tooltip>
    </div>
  );
};

export default EntityActions;