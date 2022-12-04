import React, {FC, useCallback} from "react";
import {ValidationError} from "../../models/CommonModels";
import {useTranslation} from "react-i18next";

interface Props {
  id?: string;
  label?: string;
  labelClasses?: string;
  selectClasses?: string;
  errors?: ValidationError[];
  placeholder: string;
  className?: string;
  fontSize?: string;
  errorTextClasses?: string;
  value: string;
  options: { value: string, text: string }[];
  onSelect: (val: string) => void;
}

const BaseSelect: FC<Props> = ({
  label,
  labelClasses,
  errors= [],
  id,
  placeholder,
  className,
  fontSize,
  selectClasses,
  errorTextClasses,
  options,
  value,
  onSelect
}) => {
  const {t} = useTranslation('validations');
  const errorText = !!errors.length && t(errors[0].text, errors[0].additionalData);

  const mappedOptions = [
    { text: placeholder, value: ''},
    ...options
  ].map((option, index) => {
    return (
      <option
        disabled={!index}
        hidden={!index}
        value={option.value}
        key={option.value + '-' + index}
      >
        {option.text}
      </option>
    );
  });

  const inputClassList = useCallback(() => {
    return `w-full border-transparent border-r-[20px] pl-5 py-2.5 bg-bg-stroke rounded-lg text-mgb !outline-none focus:border-transparent ${selectClasses}`;
  }, [errors, selectClasses]);

  return (
    <div className={`group w-full ${className} ${fontSize}`}>
      {
        label &&
        <label
          htmlFor={id}
          className={`cursor-text block px-1 mb-1 text-gb group-focus-within:text-blue ${labelClasses}`}
        >
          { label }
        </label>
      }
      <div className={`border rounded-lg ${!!errors.length ? 'border-error' : 'border-transparent'}`}>
        <select
          id={id}
          placeholder={placeholder}
          className={inputClassList()}
          value={value}
          onChange={(e) => onSelect(e.target.value)}
        >
          { mappedOptions }
        </select>
      </div>
      {
        errorText && (
          <p className={`px-2 mt-1 text-error text-base ${errorTextClasses}`}>
            {errorText}
          </p>
        )
      }
    </div>
  );
}

export default BaseSelect;