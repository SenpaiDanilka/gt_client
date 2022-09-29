import {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {gql, NetworkStatus, useMutation, useQuery} from '@apollo/client';
import {BaseLoader} from "../components/BaseComponents/BaseLoader";
import {useLoading} from "../contexts/LoadingContext";

const FindUserByID = gql`
  query FindUserByID($id: ID!) {
    findUserByID(id: $id) {
      items {
        data {
          _id
          description
          name
          type
        }
      }
    }
  }
`;

const DeleteItem = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

const Items = () => {
  const userId = localStorage.getItem("userId")
  const {data, loading: itemsLoading, networkStatus} = useQuery(FindUserByID, {
    variables: {
      id: userId
    }
  })
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(data?.findUserByID?.items.data || []);
  }, [data]);

  const [deleteItem, { loading: deleteLoading }] = useMutation(DeleteItem)
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { setLoading, setAlertData } = useLoading();

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || itemsLoading || deleteLoading)
  }, [networkStatus, itemsLoading, deleteLoading]);

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {
        deleteItem({
          variables: {
            id: id
          }
        }).then(() => {
          setItems((current) =>
            current.filter((item: any) => item._id !== id)
          );
          setAlertData({
            isOpen: true,
            text: 'Item has been deleted',
            type: 'success'
          });
        }).catch(() => {
          setAlertData({
            isOpen: true,
            text: 'Smth went wrong',
            type: 'error'
          });
        });
      }
    },
    {
      children: 'View item',
      id: 'view',
      onClick: () => { navigate(`/items/${id}`) }
    }
  ]);

  const List = (
    items.map((item: any) => (
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
          <BaseMenu options={menuOptions(String(item._id))}/>
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