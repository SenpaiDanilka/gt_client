import {FormDataType, ValidationFunction} from "../models/CommonModels";
import React, {useState} from "react";
import {validator} from "../utils/validate";

interface Props {
  initialState: FormDataType;
  onSubmit: (e: any) => void;
  rules?: {[K: string]: ValidationFunction[]};
}

const useForm = ({initialState, onSubmit, rules}: Props) => {
  const [formData, setFormData] = useState(initialState);
  const isNotValidData = Object.values(formData).some(field => !!field.errors.length);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let isError = false;
      Object.keys(formData).forEach((key) => {
        const res = Array.from(validator(formData[key].value, rules?.[key]));
        if (!isError) {
          isError = !!res.length;
        }
        setFormData(formData => ({
          ...formData,
          [key]: {...formData[key], errors: res}
        }));
      });
      !isError && onSubmit(e);
    }
  };

  const handleBlur = (e: React.FocusEvent, rules?: ValidationFunction[]) => {
    const key = e.target.id as keyof typeof formData;
    const res = validator(formData[key].value, rules);
    setFormData({...formData, [key]: {...formData[key], errors: Array.from(res)}});
  };

  const handleChange = (val: string, key: keyof typeof formData) => {
    setFormData({...formData, [key]: {value: val, errors: []}});
  };

  return { formData, isNotValidData, setFormData, handleKeyPress, handleBlur, handleChange };
}

export default useForm;