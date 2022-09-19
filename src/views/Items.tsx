import React, {useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";

const Items = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {console.log(`delete item ${id}`)}
    },
    {
      children: 'View item',
      id: 'view',
      onClick: () => { navigate(`/items/${id}`) }
    }
  ]);

  const List = (
    [1,2,3].map((value) => (
      <div
        className="flex justify-between items-center"
        key={value}
      >
        <div className="flex justify-between items-center p-4 w-full">
          <BaseAvatar
            alt={`Mocked Item ${value}`}
            size={40}
            variant="square"
            className="mr-2"
          />
          <div className="flex flex-col flex-1">
            <span>{`Item name ${value}`}</span>
            <span>{`Item desc: ${value}`}</span>
          </div>
          <span>{`Item type: type ${value}`}</span>
        </div>
        <BaseMenu options={menuOptions(String(value))}/>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">
        {t('items')}
      </p>
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddClick={() => navigate('/items/new')}
        list={List}
      />
    </div>
  )
}

export default Items;