import React, {useEffect} from "react";
import {useLoading} from "../contexts/LoadingContext";
import {useNavigate} from "react-router-dom";
import EditItemForm from "../components/items/EditItemForm";
import {FormDataType} from "../models/CommonModels";
import {useCreateItemMutation} from "../generated/apollo-functions";
import {ItemType} from "../generated/types";
import {GET_USER_BY_ID} from "../services/UsersService";

export default function ItemNew() {
  const navigate = useNavigate();
  const [createItemFunc, {loading}] = useCreateItemMutation();
  const {setLoading, setAlertData} = useLoading();
  const userId = localStorage.getItem("userId")!;

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);

  function handleSave(formData: FormDataType) {
    createItemFunc({
      variables: {
        name: formData.name.value,
        description: formData.description.value,
        type: formData.type.value as ItemType,
        owner: userId
      },
      refetchQueries: [{
        query: GET_USER_BY_ID,
        variables: {
          id: userId
        }
      }]
    }).then((res) => {
      setAlertData({
        isOpen: true,
        text: 'Item has been created',
        type: 'success'
      });
      const itemId = res.data!.createItem!._id;
      navigate(`/items/${itemId}`);
    }).catch(() => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    });
  }

  return (
    <div className="p-4">
      <EditItemForm
        isNew
        onSubmit={handleSave}
      />
    </div>
  );
}