import BaseContainer from "../components/BaseComponents/BaseContainer";
import React, { useEffect } from "react";
import {useLoading} from "../contexts/LoadingContext";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {CREATE_SPACE} from '../services/SpacesService'
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";

const SpaceNew = () => {
  const [createSpaceFunc, {loading}] = useMutation(CREATE_SPACE);
  const navigate = useNavigate();
  const {setLoading, setAlertData} = useLoading();

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);

  function handleSave(formData: FormDataType) {
    createSpaceFunc({
      variables: {
        name: formData.name.value,
        description: formData.description.value,
        owner: localStorage.getItem("userId")
      }
    }).then((res) => {
      setAlertData({
        isOpen: true,
        text: 'Space has been created',
        type: 'success'
      });
      const spaceId = res.data.createSpace._id;
      navigate(`/spaces/${spaceId}`);
    }).catch(() => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    });
  }

  return (
    <BaseContainer className="p-4 my-4 mx-4">
      <EditSpaceForm
        onSubmit={handleSave}
      />
    </BaseContainer>
  );
}

export default SpaceNew;