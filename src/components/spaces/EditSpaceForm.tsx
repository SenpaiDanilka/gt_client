import React, {FC, FormEvent} from "react";
import BaseButton from "../BaseComponents/BaseButton";
import useForm from "../../hooks/useForm";
import {FormDataType} from "../../models/CommonModels";
import {isRequired, minLength} from "../../utils/validate";
import {useTranslation} from "react-i18next";
import BaseInput from "../BaseComponents/BaseInput";

const defaultFieldsState = {
  name: '',
  description: ''
};

const formFieldsRules = {
  name: [
    (v: string) => isRequired(v),
    (v: string) => minLength(v, 3)
  ]
};

interface Props {
  isNew?: boolean;
  onSubmit: (formData: FormDataType) => void;
  editData?: {[K: string]: string};
  onCancel?: () => void;
}

const EditSpaceForm: FC<Props> = ({
  onSubmit,
  editData= defaultFieldsState,
  onCancel,
  isNew
}) => {
  const {t} = useTranslation('common');
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
          {t(!isNew ? 'save' : 'create')}
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

export default EditSpaceForm;