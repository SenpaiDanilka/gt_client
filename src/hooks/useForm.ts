import {FormDataType} from "../models/CommonModels";
import React, {useEffect, useState} from "react";
import {validator} from "../utils/validate";
import {ValidationRule} from "../models/CommonModels";

const useForm = (initialData: FormDataType) => {
  const [formData, setFormData] = useState<FormDataType>(initialData);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const isNotValidData = Object.values(formData).some(field => !!field.errors.length);

  const handleBlur = (e: React.FocusEvent, rules: ValidationRule[]) => {
    const key = e.target.id as keyof typeof formData;
    const res = validator(formData[key].value, rules);
    setFormData({...formData, [key]: {...formData[key], errors: Array.from(res)}});
  };

  const handleFocus = (e: React.FocusEvent) => {
    const key = e.target.id as keyof typeof formData;
    setFormData({...formData, [key]: {...formData[key], errors: []}});
  };

  const handleChange = (val: string, key: keyof typeof formData) => {
    setFormData({...formData, [key]: {...formData[key], value: val}});
  };

  return { formData, isNotValidData, setFormData, handleBlur, handleFocus, handleChange };
}

export default useForm;