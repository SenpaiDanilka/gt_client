import React, {useEffect} from "react";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {ItemType} from "../models/ItemsModels";
import BaseInput from "../components/BaseComponents/BaseInput";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import {gql, useMutation} from "@apollo/client";
import {useLoading} from "../contexts/LoadingContext";
import {MenuItem} from "@mui/material";
import useForm from "../hooks/useForm";
import {isRequired, minLength} from "../utils/validate";

const CreateItem = gql`
  mutation CreateItem($name: String!, $description: String!, $type: ItemType!, $owner: String! ) {
    createItem(name: $name, description: $description, type: $type, owner: $owner) {
      _id
      name
      description
      type
    }
  }
`;

const initialState = {
  name: {
    value: '',
    errors: []
  },
  type: {
    value: '',
    errors: []
  },
  description: {
    value: '',
    errors: []
  },
};

const formFieldsRules = {
  name: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 3)
  ],
  type: [
    (v: string) => isRequired(v)
  ]
};

export default function ItemNew() {
  const [createItemFunc, {loading}] = useMutation(CreateItem);
  const {t} = useTranslation('common');
  const { setLoading, setAlertData } = useLoading();
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

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    !validateAll() && createItemFunc({
      variables: {
        name: formData.name.value,
        description: formData.description.value,
        type: formData.type.value,
        owner: localStorage.getItem("userId")
      }
    }).then(() => {
      setAlertData({
        isOpen: true,
        text: 'Item has been created',
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

  const typeOptions = Object.keys(ItemType).filter((v) => isNaN(Number(v)));

  return (
    <div className="p-4">
      <BaseContainer className="p-4">
        <form
          noValidate
          className="flex flex-col items-center"
          onKeyDown={handleKeyPress}
          onSubmit={handleSave}
        >
          <div className="flex justify-between items-center w-full">
            <BaseAvatar
              alt={formData.name.value}
              size={40}
              variant="square"
              className="mr-2"
            />
            <div className="flex flex-col flex-1 space-y-4">
              <BaseInput
                id="name"
                errors={formData.name.errors}
                label={t('name')}
                value={formData.name.value}
                onChange={(val) => handleChange(val, "name")}
                onBlur={(e) => handleBlur(e, formFieldsRules.name)}
              />
              <BaseInput
                id="type"
                isSelect
                errors={formData.type.errors}
                label={t('type')}
                value={formData.type.value}
                onChange={(val) => handleChange(val, "type")}
              >
                {
                  typeOptions.map(option => (
                    <MenuItem
                      value={option}
                      key={option}
                    >
                      {option}
                    </MenuItem>
                  ))
                }
              </BaseInput>
            </div>
          </div>
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
    </div>
  );
}