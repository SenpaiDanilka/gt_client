import React, {FC, FormEvent} from "react";
import BaseInputOld from "../BaseComponents/BaseInputOld";
import BaseButton from "../BaseComponents/BaseButton";
import useForm from "../../hooks/useForm";
import {FormDataType} from "../../models/CommonModels";
import {isRequired, minLength} from "../../utils/validate";
import {useTranslation} from "react-i18next";

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
  onSubmit: (formData: FormDataType) => void;
  editData?: {[K: string]: string};
  onCancel?: () => void;
}

const EditSpaceForm: FC<Props> = ({
  onSubmit,
  editData= defaultFieldsState,
  onCancel
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
      className="flex flex-col items-center space-y-4 p-4"
      onKeyDown={handleKeyPress}
      onSubmit={handleSubmit}
    >
      <BaseInputOld
        id="name"
        errors={formData.name.errors}
        label={t('name')}
        value={formData.name.value}
        onChange={(val) => handleChange(val, "name")}
        onBlur={(e) => handleBlur(e, formFieldsRules.name)}
      />
      <BaseInputOld
        label="description"
        value={formData.description.value}
        rows={4}
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

export default EditSpaceForm;