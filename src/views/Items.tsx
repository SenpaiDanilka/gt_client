import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NetworkStatus} from '@apollo/client';
import {GET_USER_ITEMS} from "../services/ItemsService";
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteItemMutation, useFindUserItemsByIdQuery} from "../generated/apollo-functions";
import {FindUserItemsByIdQuery} from "../generated/operations";
import {Item} from "../generated/types";
import AddButton from "../components/AddButton";
import ItemsTable from "../components/items/ItemsTable";

const Items = () => {
  const navigate = useNavigate();
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

  return (
    <div className="p-4">
      <div id="controls" className="flex justify-end mb-4">
        <AddButton text="Add Item" onClick={() => navigate('/items/new')} />
      </div>
      <ItemsTable
        items={items as Item[]}
        onDelete={handleOnDeleteClick}
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