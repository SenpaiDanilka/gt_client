import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import {useTranslation} from "react-i18next";

const Contacts = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const menuOptions = (id: string) => ([
    {
      text: 'Delete',
      id: 'delete',
      onClick: () => {console.log(`delete user ${id}`)}
    },
    {
      text: 'View profile',
      id: 'view',
      onClick: () => { navigate(`/contacts/${id}`) }
    }
  ]);

  const List = (
    [1,2,3].map((value) => (
      <div
        className="flex justify-between items-center"
        key={value}
      >
        <div className="flex items-center p-4">
          <BaseAvatar
            alt={`Mocked User ${value}`}
            size={40}
            className="mr-2"
          />
          {`Mocked User ${value}`}
        </div>
        <BaseMenu options={menuOptions(String(value))}/>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">
        {t('contacts')}
      </p>
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddClick={() => {}}
        list={List}
      />
    </div>
  )
}

export default Contacts;