import React, {FC, ReactNode, SyntheticEvent, useCallback, useRef, useState} from "react";
import {ValidationError} from "../../models/CommonModels";
import {useTranslation} from "react-i18next";

/*TODO WIP CUSTOM INPUT*/

interface Props {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  variant?: "standard" | "filled" | "outlined";
  inputClasses?: string;
  labelClasses?: string;
  errorTextClasses?: string;
  type?: string;
  errors?: ValidationError[];
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

const BaseInput: FC<Props> = ({
  id,
  value,
  onChange,
  onBlur,
  variant = "outlined",
  inputClasses = '',
  labelClasses,
  errorTextClasses,
  type,
  errors = [],
  disabled,
  label,
  placeholder,
  iconStart,
  iconEnd,
  multiline,
  rows,
  className
}) => {
  const {t} = useTranslation('validations');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const inputClassList = useCallback(() => {
    const errorClasses = 'border-error';
    const initialClasses = `p-2 text-mgb placeholder-gb !outline-none w-full dark:bg-dark-bg dark:text-white focus:border-transparent ${inputClasses} ${!!errors.length ? errorClasses : 'border-gb'} ${multiline && 'resize-none overflow-hidden'}`;
    const outlinedClasses = 'border group-hover:border-blue focus:shadow-input-focus rounded-lg';
    const standardClasses = 'border-b group-hover:border-blue focus:shadow-standard-input-focus';

    if (variant === 'outlined') {
      return initialClasses.concat(' ', outlinedClasses);
    }

    if (variant === 'standard') {
      return initialClasses.concat(' ', standardClasses);
    }

    return initialClasses;
  }, [errors, inputClasses, variant]);

  const errorText = !!errors.length && t(errors[0].text, errors[0].additionalData);

  const onTextAreaChangeHandler = function(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
    onChange(target.value);
  };

  return (
    <div className={`group w-full ${className}`}>
      {
        <label
          htmlFor={id}
          className={`cursor-text block px-1 mb-1 text-base text-gb group-focus-within:text-blue dark:text-white ${labelClasses}`}
        >
          {label}
        </label>
      }
      <div className="relative">
        {
          iconStart && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              {iconStart}
            </div>
          )
        }
        {
          multiline
            ? (
              <textarea
                ref={textareaRef}
                id={id}
                rows={1}
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={onTextAreaChangeHandler}
                onBlur={onBlur}
                className={inputClassList()}
              />
            )
            : (
              <input
                id={id}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={inputClassList()}
              />
            )
        }

        {
          iconEnd && (
            <div className="flex absolute inset-y-0 right-0 items-center pr-3">
              {iconEnd}
            </div>
          )
        }
      </div>
      {
        errorText && (
          <p className={`p-2 text-error text-base ${errorTextClasses}`}>
            {errorText}
          </p>
        )
      }
    </div>
  );
};

export default BaseInput;