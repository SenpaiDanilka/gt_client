import {useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useMutation, useQuery} from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DeleteItem, GetUserItems } from "../services/ItemsService";

const Items = () => {
  const userId = localStorage.getItem("userId")
  const {data} = useQuery(GetUserItems, {
    variables: {
      id: userId
    }
  })
  const [deleteItem] = useMutation(DeleteItem)
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {
        deleteItem({
          variables: {
            id: id
          }
        }).then(res => {
          console.log(`delete item ${res}`)
        })
      }
    },
    {
      children: 'View item',
      id: 'view',
      onClick: () => { navigate(`/items/${id}`) }
    }
  ]);

  const items = data?.findUserByID?.items.data

  const List = (
    items ? items.map((item: any) => (
      <div
        className="flex justify-between items-center"
        key={item._id}
      >
        <div className="flex justify-between items-center p-4 w-full">
          <BaseAvatar
            alt={`Mocked Item ${item.name}`}
            size={40}
            variant="square"
            className="mr-2"
          />
          <div className="flex flex-col flex-1">
            <span>{`${item.name}`}</span>
            <span>{`${item.description}`}</span>
          </div>
          <span>{`${item.type}`}</span>
        </div>
        <BaseMenu options={menuOptions(String(item._id))}/>
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
        onAddClick={() => navigate('/items/new')}
        list={List}
      />
    </div>
  )
}

export default Items;