import {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {NetworkStatus} from '@apollo/client';
import {GET_USER_ITEMS} from "../services/ItemsService";
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteItemMutation, useFindUserItemsByIdQuery} from "../generated/apollo-functions";
import {FindUserItemsByIdQuery} from "../generated/operations";
import {useTranslation} from "react-i18next";

const Items = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const {setLoading, setAlertData} = useLoading();
  const userId = localStorage.getItem("userId")
  const {data, loading: itemsLoading, networkStatus} = useFindUserItemsByIdQuery({
    variables: {
      id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');

  const handleOnDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setIsApproveModalOpen(true);
  };
  const handleCancelDeleteClick = () => {
    setIsApproveModalOpen(false);
  };

  const items = data?.findUserByID?.items.data;

  const [deleteItem, {loading: deleteLoading}] = useDeleteItemMutation({
    variables: {id: deleteItemId},
    update(cache, {data}) {
      const {findUserByID} = cache.readQuery<FindUserItemsByIdQuery>({
        query: GET_USER_ITEMS,
        variables: {
          id: userId
        }
      }) || ({} as Partial<FindUserItemsByIdQuery>);
      cache.writeQuery({
        query: GET_USER_ITEMS,
        variables: {
          id: userId
        },
        data: {
          findUserByID: {
            ...findUserByID,
            items: {
              ...findUserByID?.items,
              data: findUserByID?.items.data.filter((item) => item!._id !== data?.deleteItem!._id)
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
      setIsApproveModalOpen(false);
    },
    onError: () => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    }
  });

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || itemsLoading || deleteLoading)
  }, [networkStatus, itemsLoading, deleteLoading]);

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => handleOnDeleteClick(id)
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
    items && items.map((item) => (
      <div
        className="flex justify-between items-center"
        key={item!._id}
      >
        <div className="flex p-4 w-full">
          <BaseAvatar
            alt={`Mocked Item ${item!.name}`}
            size={40}
            variant="square"
            className="mr-4"
          />
          <div className="flex flex-col flex-1">
            <span className="mb-2 font-semibold leading-4">{item!.name}</span>
            <span className="line-clamp-3">{item!.description}</span>
          </div>
          <div className="text-right w-28 place-self-center">
            {t(`itemTypes.${item!.type}`)}
          </div>
        </div>
        <BaseMenu options={menuOptions(item!._id)}/>
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
      <SubmitActionModal
        open={isApproveModalOpen}
        onSubmit={deleteItem}
        onCancel={handleCancelDeleteClick}
      >
        <p className="mb-4">Delete item ID: {
          <span className="font-bold">{deleteItemId}</span>
        }?</p>
      </SubmitActionModal>
    </div>
  )
}

export default Items;