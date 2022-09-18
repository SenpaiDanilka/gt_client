import BaseContainer from "../components/BaseComponents/BaseContainer";
import React from "react";
import {isRequired, maxLength, minLength} from "../utils/validate";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import useForm from "../hooks/useForm";
import BaseForm from "../components/BaseComponents/BaseForm";

const initialState = {
  name: {
    value: 'Mocked user name',
    errors: []
  }
}

const Settings = () => {
  const {t} = useTranslation('common');
  const { formData, isNotValidData, handleBlur, handleFocus, handleChange } = useForm(initialState);
  const formFieldsData = [
    {
      id: 'name',
      rules: [
        (v: string) => isRequired(v),
        (v: string) => minLength(v, 3),
        (v: string) => maxLength(v, 20)
      ],
      autofocus: true,
      data: formData.name
    }
  ];
  const save = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData, 'saved');
  };

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">{ t('settings') }</p>
      <BaseContainer className="flex flex-col items-center p-8 w-fit">
        <BaseForm
          onSubmit={save}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          formFieldsData={formFieldsData}
          controls={
            <BaseButton
              type="submit"
              variant="contained"
              size="small"
              disabled={isNotValidData}
              className="mt-4"
            >
              { t('save') }
            </BaseButton>
          }
          className="max-w-[360px]"
        />
      </BaseContainer>
    </div>
  );
}

export default Settings;