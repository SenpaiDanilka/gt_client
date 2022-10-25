import React, {FC, FormEvent, useState} from "react";
import BaseInput from "../BaseComponents/BaseInput";
import {MenuItem} from "@mui/material";
import BaseButton from "../BaseComponents/BaseButton";
import useForm from "../../hooks/useForm";
import {FormDataType} from "../../models/CommonModels";
import {isRequired, minLength} from "../../utils/validate";
import {useTranslation} from "react-i18next";
import {ItemType} from "../../generated/types";
import BaseInput2 from "../BaseComponents/BaseInput2";
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
  const [passwordVisibility, setPasswordVisibility] = useState(false);

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
{/*      <BaseInput
        id="name"
        variant="standard"
        errors={formData.name.errors}
        label={t('name')}
        value={formData.name.value}
        onChange={(val) => handleChange(val, "name")}
        onBlur={(e) => handleBlur(e, formFieldsRules.name)}
      />*/}
      <BaseInput2
        id="name"
        label={t('name')}
        type={passwordVisibility ? 'text' : 'password'}
      iconEnd={
      <PasswordVisibilityButton
        visibility={passwordVisibility}
        onClick={setPasswordVisibility}
      />}
        inputClasses="text-xl px-10 peer"
        iconStart={<SearchIcon className="peer-focus:[&>*]:fill-blue" />}
        errors={formData.name.errors}
        value={formData.name.value}
        onChange={(val) => handleChange(val, "name")}
        onBlur={(e) => handleBlur(e, formFieldsRules.name)}
      />
      <BaseInput
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
      </BaseInput>
      <BaseInput
        variant="standard"
        label={t('description')}
        value={formData.description.value}
        maxRows={4}
        multiline
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