import ItemsTableItem from "./ItemsTableItem";
import {Item} from "../../generated/types";
import {useTranslation} from "react-i18next";
import {FC} from "react";
import {OptionsDataType} from "../PopperWithAutocomplete";

interface Props {
  items: Item[];
  onDelete: (id: string) => void;
}

const ItemsTable: FC<Props> = ({
  items,
  onDelete
}) => {
  const columns = ['name', 'category', 'status', 'tenant'];
  const {t} = useTranslation('items');

  return (
    <div>
      <div className="hidden md:grid grid-cols-4 gap-x-3 mb-2.5">
        {
          columns.map((column) => (
            <span key={column} className="text-mgb dark:text-gb">
              {t(`itemsTable.${column}`)}
            </span>
          ))
        }
      </div>
      {
        items && items.map((item) => (
          <ItemsTableItem
            key={item!._id}
            item={item as Item}
            onDelete={onDelete}
          />
        ))
      }
    </div>
  );
};

export default ItemsTable;