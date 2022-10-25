import {Link} from "react-router-dom";
import BaseAvatar from "../BaseComponents/BaseAvatar";
import Tooltip from "@mui/material/Tooltip";
import BaseButton from "../BaseComponents/BaseButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTranslation} from "react-i18next";
import {FC} from "react";
import {Item} from "../../generated/types";

interface Props {
  item: Item,
  onDelete: (id: string) => void;
}

const ItemsTableItem: FC<Props> = ({
  item,
  onDelete
}) => {
  const {t} = useTranslation(['common', 'items']);

  return (
    <div className="group relative hover:bg-br-stroke dark:hover:bg-mgb text-base text-dgb dark:text-gb">
      <Link
        to={`/items/${item!._id}`}
        className="hidden md:grid grid-cols-4 gap-x-3 items-center border-b border-light-bg dark:border-br-dark py-2"
      >
        <div className="flex items-center">
          <BaseAvatar
            alt={item!.name}
            size={20}
            variant="square"
            className="mr-3 self-start"
          />
          <span className="whitespace-normal truncate">{item!.name}</span>
        </div>
        <div>{t(`itemTypes.${item!.type}`, { ns: 'items' })}</div>
        <div>status</div>
        <div>some tenant</div>
      </Link>
      <Link
        to={`/items/${item!._id}`}
        key={item!._id}
        className="flex md:hidden border-b border-light-bg dark:border-br-dark p-2"
      >
          <BaseAvatar
            alt={item!.name}
            size={100}
            variant="square"
            className="mr-5"
          />
          <div className="space-y-3">
            <div>{item!.name}</div>
            <div>{t(`itemTypes.${item!.type}`, { ns: 'items' })}</div>
            <div>status</div>
            <div>some tenant</div>
          </div>
      </Link>
      <Tooltip
        title={t('delete', { ns: 'common' })}
        className="md:hidden group-hover:block absolute right-0 top-1/2 -translate-y-1/2"
      >
        <BaseButton
          buttonType="icon"
          size="small"
          className="text-gb hover:text-blue dark:hover:text-white"
          onClick={() => onDelete(item!._id)}
        >
          <DeleteIcon className="text-3xl md:text-xl" />
        </BaseButton>
      </Tooltip>
    </div>
  );
};

export default ItemsTableItem;
