import {useTranslation} from "react-i18next";
import BaseButton from "./BaseComponents/BaseButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FC, useEffect} from "react";
import useGetCurrentBreakpoint from "../hooks/useGetCurrentBreakpoint";

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
  const { isMobileBreakpoint } = useGetCurrentBreakpoint();

  const buttonsData = [
    {
      id: 'edit',
      text: t('edit'),
      icon: <EditIcon className="text-xl md:text-base" />,
      onClick: onEdit
    },
    {
      id: 'delete',
      text: t('delete'),
      icon: <DeleteIcon className="text-xl md:text-base" />,
      onClick: onDelete
    }
  ];

  const buttonVariant = isMobileBreakpoint ? undefined : "outlined";

  return (
    <div className={className}>
      {
        buttonsData.map((button) => (
          <BaseButton
            key={button.id}
            variant={buttonVariant}
            buttonType={isMobileBreakpoint ? "icon" : undefined}
            className="first:mr-2.5 p-2.5 text-gb hover:text-blue"
            onClick={button.onClick}
          >
            <div className="text-base flex items-center">
              {button.icon}
              <span className="hidden md:inline md:ml-2">{button.text}</span>
            </div>
          </BaseButton>
        ))
      }
    </div>
  );
};

export default EntityActions;