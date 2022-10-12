import React, {useEffect} from "react";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {useLoading} from "../contexts/LoadingContext";
import {useNavigate} from "react-router-dom";
import EditItemForm from "../components/items/EditItemForm";
import {FormDataType} from "../models/CommonModels";
import {useCreateItemMutation} from "../generated/apollo-functions";
import {ItemType} from "../generated/types";

export default function ItemNew() {
  const navigate = useNavigate();
  const [createItemFunc, {loading}] = useCreateItemMutation();
  const {setLoading, setAlertData} = useLoading();

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
        owner: localStorage.getItem("userId")!
      }
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
    <BaseContainer className="p-4 my-4 mx-auto max-w-[700px] h-[400px]">
      <EditItemForm
        onSubmit={handleSave}
      />
    </BaseContainer>
  );
}