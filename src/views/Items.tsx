import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NetworkStatus} from '@apollo/client';
import {GET_USER_ITEMS} from "../services/ItemsService";
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteItemMutation, useFindUserItemsByIdQuery} from "../generated/apollo-functions";
import {FindUserItemsByIdQuery} from "../generated/operations";
import {useTranslation} from "react-i18next";
import ItemsTableItem from "../components/items/ItemsTableItem";
import {Item} from "../generated/types";
import AddButton from "../components/AddButton";

const Items = () => {
  const navigate = useNavigate();
  const {t} = useTranslation(['common', 'items']);
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

  const items = data?.findUserByID?.items.data || [];

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

  const columns = ['name', 'category', 'status', 'tenant'];

  return (
    <div className="p-4">
      <div id="controls" className="flex justify-end mb-4">
        <AddButton text="Add Item" onClick={() => navigate('/items/new')} />
      </div>
      <div className="hidden md:grid grid-cols-4 gap-x-3 mb-2.5">
        {
          columns.map((column) => (
            <span key={column} className="text-mgb dark:text-gb">
              {t(`itemsTable.${column}`, { ns: 'items' })}
            </span>
          ))
        }
      </div>
      {
        items && items.map((item) => (
          <ItemsTableItem
            key={item!._id}
            item={item as Item}
            onDelete={handleOnDeleteClick}
          />
        ))
      }
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