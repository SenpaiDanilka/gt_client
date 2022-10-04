import EditableListWithSearch from "../components/EditableListWithSearch";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import { DELETE_SPACE, GET_USER_SPACES } from "../services/SpacesService";
import {useMutation, useQuery} from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spaces = () => {
  const userId = localStorage.getItem("userId")
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [deleteSpace] = useMutation(DELETE_SPACE)
  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {
        deleteSpace({
          variables: {
            id: id
          }
        }).then(res => {
          console.log(`delete space ${res}`)
        })
      }
    },
    {
      children: 'View space',
      id: 'view',
      onClick: () => { navigate(`/spaces/${id}`) }
    }
  ]);
  const {data} = useQuery(GET_USER_SPACES, {
    variables: {
      id: userId
    }
  })
  const spaces = data?.findUserByID?.spaces.data

  const List = (
    spaces ? spaces.map((space: any) => (
      <div
        className="flex justify-between items-center"
        key={space._id}
      >
        <div className="flex justify-between p-4 w-full">
          <span>{`${space.name}`}</span>
          {space.description && <span>{`${space.description}`}</span>}
          {/* <span className="font-bold">{ `IC: ${value * 2} / UC: ${value * 3}` }</span> */}
        </div>
        <BaseMenu options={menuOptions(String(space._id))}/>
      </div>
    )) : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
  );

  return (
    <div className="p-4">
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddClick={() => navigate('/spaces/new')}
        list={List}
      />
    </div>
  )
}

export default Spaces;