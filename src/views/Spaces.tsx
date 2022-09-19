import EditableListWithSearch from "../components/EditableListWithSearch";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";

const Spaces = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {console.log(`delete space ${id}`)}
    },
    {
      children: 'View space',
      id: 'view',
      onClick: () => { navigate(`/spaces/${id}`) }
    }
  ]);

  const List = (
    [1,2,3].map((value) => (
      <div
        className="flex justify-between items-center"
        key={value}
      >
        <div className="flex justify-between p-4 w-full">
          <span>{`Space name ${value}`}</span>
          <span className="font-bold">{ `IC: ${value * 2} / UC: ${value * 3}` }</span>
        </div>
        <BaseMenu options={menuOptions(String(value))}/>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">
        {t('spaces')}
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

export default Spaces;