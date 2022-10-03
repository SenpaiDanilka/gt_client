import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseInput from "../components/BaseComponents/BaseInput";
import React, {useEffect} from "react";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import {isRequired, minLength} from "../utils/validate";
import {useLoading} from "../contexts/LoadingContext";
import useForm from "../hooks/useForm";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";

const CreateSpace = gql`
  mutation CreateSpace($name: String!, $description: String!, $owner: String! ) {
    createSpace(name: $name, description: $description, owner: $owner) {
      _id
      name
      description
    }
  }
`;

const initialState = {
  name: {
    value: '',
    errors: []
  },
  description: {
    value: '',
    errors: []
  }
};

const formFieldsRules = {
  name: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 3)
  ]
};

const SpaceNew = () => {
  //const [createSpaceFunc, {loading}] = useMutation(CreateItem);
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const {setLoading, setAlertData} = useLoading();
  const {
    handleKeyPress,
    formData,
    isNotValidData,
    handleBlur,
    handleChange,
    validateAll
  } = useForm({
    initialState,
    onSubmit: handleSave,
    rules: formFieldsRules
  });

/*  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading]);*/

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    validateAll(); /*TODO replace with code below*/
/*    !validateAll() && createSpaceFunc({
      variables: {
        name: formData.name.value,
        description: formData.description.value,
        type: formData.type.value,
        owner: localStorage.getItem("userId")
      }
    }).then((res) => {
      setAlertData({
        isOpen: true,
        text: 'Space has been created',
        type: 'success'
      });
      const spaceId = res.data.createItem._id;
      navigate(`/createSpace/${spaceId}`);
    }).catch(() => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    });*/
  }

  return (
    <BaseContainer className="p-4 my-4 mx-4">
      <form
        noValidate
        className="flex flex-col items-center space-y-4 p-4"
        onKeyDown={handleKeyPress}
        onSubmit={handleSave}
      >
        <BaseInput
          id="name"
          errors={formData.name.errors}
          label={t('name')}
          value={formData.name.value}
          onChange={(val) => handleChange(val, "name")}
          onBlur={(e) => handleBlur(e, formFieldsRules.name)}
        />
        <BaseInput
          label="description"
          value={formData.description.value}
          rows={4}
          multiline
          onChange={(val) => handleChange(val, "description")}
          className="my-4"
        />
        <BaseButton
          type="submit"
          variant="contained"
          disabled={isNotValidData}
        >
          {t('save')}
        </BaseButton>
      </form>
    </BaseContainer>
  );
}

export default SpaceNew;