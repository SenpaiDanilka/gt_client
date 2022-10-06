import {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {NetworkStatus, useMutation, useQuery} from '@apollo/client';
import {DELETE_ITEM, GET_USER_ITEMS} from "../services/ItemsService";
import {useLoading} from "../contexts/LoadingContext";

const Items = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const {setLoading, setAlertData} = useLoading();
  const userId = localStorage.getItem("userId")
  const {data, loading: itemsLoading, networkStatus} = useQuery(GET_USER_ITEMS, {
    variables: {
      id: userId
    },
    fetchPolicy: 'cache-and-network'
  });

  const items = data?.findUserByID?.items.data;

  const [deleteItem, {loading: deleteLoading}] = useMutation(DELETE_ITEM, {
    update(cache, {data: {deleteItem}}) {
      const {findUserByID} = cache.readQuery<any>({
        query: GET_USER_ITEMS,
        variables: {
          id: userId
        }
      });
      cache.writeQuery({
        query: GET_USER_ITEMS,
        variables: {
          id: userId
        },
        data: {
          findUserByID: {
            ...findUserByID,
            items: {
              ...findUserByID.items,
              data: findUserByID.items.data.filter((item: any) => item._id !== deleteItem._id)
            }
          }
        }
      });
    },
    onQueryUpdated: () => {
      setAlertData({
        isOpen: true,
        text: 'Item has been deleted',
        type: 'success'
      });
    },
    onError: () => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    }
  })

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || itemsLoading || deleteLoading)
  }, [networkStatus, itemsLoading, deleteLoading]);

  const menuOptions = (id: number) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {
        deleteItem({variables: {id}})
      }
    },
    {
      children: 'View item',
      id: 'view',
      onClick: () => {
        navigate(`/items/${id}`)
      }
    }
  ]);

  const List = (
    items && items.map((item: any) => (
      <div
        className="flex justify-between items-center"
        key={item._id}
      >
        <div className="flex p-4 w-full">
          <BaseAvatar
            alt={`Mocked Item ${item.name}`}
            size={40}
            variant="square"
            className="mr-6"
          />
          <div className="flex flex-col flex-1">
            <span className="mb-2 font-semibold leading-4">{`${item.name}`}</span>
            <span className="line-clamp-3">{`${item.description}`}</span>
          </div>
          <div className="text-right w-28 place-self-center">{`${item.type}`}</div>
        </div>
        <BaseMenu options={menuOptions(item._id)}/>
      </div>
    ))
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