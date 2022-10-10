import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useQuery, useMutation} from '@apollo/client';
import {DELETE_ITEM, FIND_ITEM_BY_ID, UPDATE_ITEM} from "../services/ItemsService";
import {useEffect, useState} from "react";
import {useLoading} from "../contexts/LoadingContext";
import EntityActions from "../components/EntityActions";
import EditItemForm from "../components/items/EditItemForm";
import {FormDataType} from "../models/CommonModels";
import SubmitActionModal from "../components/SubmitActionModal";

export default function Item() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const {data, loading: fetchLoading, error: fetchError} = useQuery(FIND_ITEM_BY_ID, {
    variables: {id}
  });
  const [deleteItem, {loading: deleteLoading, error: deleteError}] = useMutation(DELETE_ITEM, {
    variables: {id},
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
  const [updateItem, {loading: editLoading, error: editError}] = useMutation(UPDATE_ITEM, {
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
        id: id,
        data: {
          name: formData.name.value,
          type: formData.type.value,
          description: formData.description.value
        }
      }
    });
  };

  return (
    <BaseContainer className="p-4 mx-auto my-4 max-w-[700px] min-h-[400px] relative">
      {
        isEdit
          ? <EditItemForm
            onSubmit={handleEditItem}
            onCancel={toggleEditItem}
            editData={{
              name: data.findItemByID.name,
              type: data.findItemByID.type,
              description: data.findItemByID.description
            }}
          />
          : (
            <>
              {
                data && data.findItemByID &&
                <>
                  <div className="flex justify-between items-center w-full">
                    <BaseAvatar
                      alt={data.findItemByID.name}
                      size={60}
                      variant="square"
                      className="mr-4"
                    />
                    <div className="flex flex-col flex-1 space-y-4">
                      <span>{data.findItemByID.name}</span>
                      <span>{data.findItemByID.type}</span>
                    </div>
                  </div>
                  {
                    data.findItemByID.description &&
                    <p className="my-4">{data.findItemByID.description}</p>
                  }
                  <EntityActions
                    onDelete={handleDeleteItem}
                    onEdit={toggleEditItem}
                    className="absolute top-5 right-5"
                  />
                </>
              }
            </>
          )
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
    </BaseContainer>
  );
};