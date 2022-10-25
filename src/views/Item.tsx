import {useNavigate, useParams} from "react-router-dom";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useEffect, useState} from "react";
import {useLoading} from "../contexts/LoadingContext";
import EntityActions from "../components/EntityActions";
import EditItemForm from "../components/items/EditItemForm";
import {FormDataType} from "../models/CommonModels";
import SubmitActionModal from "../components/SubmitActionModal";
import {
  useDeleteItemMutation,
  useFindItemByIdQuery,
  useUpdateItemMutation
} from "../generated/apollo-functions";
import {ItemType} from "../generated/types";
import {useTranslation} from "react-i18next";

export default function Item() {
  const {t} = useTranslation(['items']);
  const {id} = useParams();
  const navigate = useNavigate();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const {data, loading: fetchLoading, error: fetchError} = useFindItemByIdQuery({
    variables: {id: id!}
  });
  const [deleteItem, {loading: deleteLoading, error: deleteError}] = useDeleteItemMutation({
    variables: {id: id!},
    onCompleted: () => {
      setIsApproveModalOpen(false);
      setAlertData({
        isOpen: true,
        text: 'Item has been deleted',
        type: 'success'
      });
      navigate('/items');
    }
  });
  const [updateItem, {loading: editLoading, error: editError}] = useUpdateItemMutation({
    onQueryUpdated: () => {
      setAlertData({
        isOpen: true,
        text: 'Item has been updated',
        type: 'success'
      });
      toggleEditItem();
    }
  });
  const {setLoading, setAlertData} = useLoading();
  const [isEdit, setIsEdit] = useState(false);

  const item = data?.findItemByID;

  useEffect(() => {
    setLoading(fetchLoading || deleteLoading || editLoading);
    return () => setLoading(false);
  }, [fetchLoading, deleteLoading, editLoading]);

  useEffect(() => {
    (fetchError || deleteError || editError) && setAlertData({
      isOpen: true,
      text: 'Smth went wrong',
      type: 'error'
    });
  }, [fetchError, deleteError, editError]);

  const handleDeleteItem = () => {
    setIsApproveModalOpen(true);
  };

  const toggleEditItem = () => {
    setIsEdit(!isEdit);
  };

  const handleEditItem = async (formData: FormDataType) => {
    await updateItem({
      variables: {
        id: id!,
        data: {
          name: formData.name.value,
          type: formData.type.value as ItemType,
          description: formData.description.value
        }
      }
    });
  };

  return (
    <div className="p-5 md:p-10 mx-auto my-4 relative">
      {
        isEdit
          ? <EditItemForm
            onSubmit={handleEditItem}
            onCancel={toggleEditItem}
            editData={{
              name: item!.name,
              type: item!.type,
              description: item!.description || ''
            }}
          />
          : item &&
          <div className="text-base text-gb">
            <div className="flex">
              <BaseAvatar
                alt={item.name}
                size={140}
                variant="square"
                className="mr-4"
              />
              <span className="mt-1 text-mgb dark:text-white text-xl font-bold">{item.name}</span>
            </div>
            {
              item.description &&
              <p className="my-2">{item.description}</p>
            }
            <span className="mr-2.5">Category: {t(`itemTypes.${item!.type}`)}</span>
            <span>Status: Available</span>
            <EntityActions
              onDelete={handleDeleteItem}
              onEdit={toggleEditItem}
              className="absolute top-5 right-5"
            />
          </div>
      }
      <SubmitActionModal
        open={isApproveModalOpen}
        onSubmit={deleteItem}
        onCancel={() => setIsApproveModalOpen(false)}
      >
        <p className="mb-4">Delete item ID: {
          <span className="font-bold">{id}</span>
        }?</p>
      </SubmitActionModal>
    </div>
  );
};