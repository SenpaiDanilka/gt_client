import React, {FC, FormEvent, useState} from "react";
import BaseInputOld from "../BaseComponents/BaseInputOld";
import {MenuItem} from "@mui/material";
import BaseButton from "../BaseComponents/BaseButton";
import useForm from "../../hooks/useForm";
import {FormDataType} from "../../models/CommonModels";
import {isRequired, minLength} from "../../utils/validate";
import {useTranslation} from "react-i18next";
import {ItemType} from "../../generated/types";
import BaseInput from "../BaseComponents/BaseInput";
import SearchIcon from "@mui/icons-material/Search";
import PasswordVisibilityButton from "../PasswordVisibilityButton";

const defaultFieldsState = {
  name: '',
  type: '',
  description: ''
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

interface Props {
  onSubmit: (formData: FormDataType) => void;
  editData?: {[K: string]: string};
  onCancel?: () => void;
}

const EditItemForm: FC<Props> = ({
  onSubmit,
  editData= defaultFieldsState,
  onCancel
}) => {
  const {t} = useTranslation(['common', 'items']);
  const {
    handleKeyPress,
    formData,
    isNotValidData,
    handleBlur,
    handleChange,
    validateAll
  } = useForm({
    initialState: editData,
    onSubmit: () => onSubmit(formData),
    rules: formFieldsRules
  });
  const typeOptions = Object.values(ItemType);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    !validateAll() && onSubmit(formData);
  };

  return (
    <form
      noValidate
      className="flex flex-col items-center space-y-4 p-4 w-[400px]"
      onKeyDown={handleKeyPress}
      onSubmit={handleSubmit}
    >
      {/*        <BaseInput
          type="file"
          id="photo"
          errors={formData.name.errors}
          value={formData.name.value}
          onChange={(val) => handleChange(val, "name")}
          onBlur={(e) => handleBlur(e, formFieldsRules.name)}
        />*/}
      <BaseInput
        id="name"
        variant="standard"
        label={t('name')}
        placeholder={t('name')}
        inputClasses="text-xl dark:text-white"
        errors={formData.name.errors}
        value={formData.name.value}
        onChange={(val) => handleChange(val, "name")}
        onBlur={(e) => handleBlur(e, formFieldsRules.name)}
        required
      />
      <BaseInputOld
        id="type"
        isSelect
        disableUnderline
        variant="filled"
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
              { t(`itemTypes.${option}`, { ns: 'items' })}
            </MenuItem>
          ))
        }
      </BaseInputOld>
      <BaseInput
        id="description"
        variant="standard"
        placeholder={t('description')}
        inputClasses="dark:text-white"
        label={t('description')}
        value={formData.description.value}
        multiline
        minRows={2}
        maxRows={4}
        onChange={(val) => handleChange(val, "description")}
        className="my-4"
      />
      <div>
        <BaseButton
          type="submit"
          variant="contained"
          disabled={isNotValidData}
          className="mr-4"
        >
          {t('save')}
        </BaseButton>
        {
          !!onCancel && (
            <BaseButton
              variant="outlined"
              onClick={onCancel}
            >
              {t('cancel')}
            </BaseButton>
          )
        }
      </div>
    </form>
  );
}

export default EditItemForm;