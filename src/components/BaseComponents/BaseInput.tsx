import React, {FC, ReactNode, SyntheticEvent, useCallback} from "react";
import {ValidationError} from "../../models/CommonModels";
import {useTranslation} from "react-i18next";

const fonts = {
  'text-xs': 12,
  'text-base': 16,
  'text-lg': 19,
  'text-xl': 24
};

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
  minRows?: number;
  maxRows?: number;
  className?: string;
  fontSize?: string;
  inputPadding?: string;
  autoFocus?: boolean;
  required?: boolean;
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
  minRows = 1,
  maxRows= 1,
  className,
  fontSize= 'text-base',
  inputPadding = 'px-2',
  autoFocus,
  required
}) => {
  const {t} = useTranslation('validations');

  const inputClassList = useCallback(() => {
    const errorClasses = 'border-error';
    const multilineClasses = 'resize-none overflow-x-hidden'
    const initialClasses = `py-2 text-mgb placeholder-gb !outline-none w-full bg-transparent focus:border-transparent ${inputClasses} ${inputPadding} ${!!errors.length ? errorClasses : 'border-gb'} ${multiline && multilineClasses}`;
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
    const lineHeight = fonts[fontSize as keyof typeof fonts];
    const setRows = (val: number) => {
      target.setAttribute('rows', val.toString());
    }
    const padding = 16;
    const scrollHeight = target.scrollHeight;
    const rowsCount = Math.round((scrollHeight - padding) / lineHeight);
      if (minRows > rowsCount) {
        setRows(minRows);
      } else if (rowsCount < maxRows) {
        setRows(rowsCount);
      } else {
        setRows(maxRows);
      }
    onChange(target.value);
  };

  return (
    <div className={`group w-full ${className} ${fontSize}`}>
      {
        label && <label
          htmlFor={id}
          className={`cursor-text block px-1 mb-1 text-gb group-focus-within:text-blue ${labelClasses}`}
        >
          {`${label}${required ? '*' : ''}`}
        </label>
      }
      <div className="relative">
        {
          iconStart && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
              {iconStart}
            </div>
          )
        }
        {
          multiline
            ? (
              <textarea
                id={id}
                rows={minRows}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete="off"
                value={value}
                onChange={onTextAreaChangeHandler}
                onBlur={onBlur}
                className={inputClassList()}
                spellCheck={false}
              />
            )
            : (
              <input
                id={id}
                disabled={disabled}
                autoFocus={autoFocus}
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
            <div className="flex absolute inset-y-0 right-0 items-center pr-2">
              {iconEnd}
            </div>
          )
        }
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
};

export default BaseInput;