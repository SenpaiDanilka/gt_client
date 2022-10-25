import React, {FC, ReactNode} from "react";
import {ValidationError} from "../../models/CommonModels";
import {useTranslation} from "react-i18next";

interface Props {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  variant?: "standard" | "filled" | "outlined";
  inputClasses?: string;
  labelClasses?: string;
  helperTextClasses?: string;
  type?: string;
  errors?: ValidationError[];
  disabled?: boolean;
  label?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

const BaseInput2: FC<Props> = ({
  id,
  value,
  onChange,
  onBlur,
  variant= "outlined",
  inputClasses = '',
  labelClasses,
  helperTextClasses,
  type,
  errors = [],
  disabled,
  label,
  iconStart,
  iconEnd
}) => {
  const {t} = useTranslation('validations')

  const inputClassList = () => {
    const initialClasses = 'p-1 !outline-none box-border'.concat(' ', inputClasses);
    const outlinedClasses = 'border border-gb group-hover:border-blue focus:border-blue rounded-lg focus:border-2';
    const standardClasses = 'border-b border-gb group-hover:border-blue focus:border-blue focus:border-b-2';

    if (variant === 'outlined') {
      return initialClasses.concat(' ', outlinedClasses);
    }

    if (variant === 'standard') {
      return initialClasses.concat(' ', standardClasses);
    }

    return initialClasses;
  };

  const helperText = !!errors.length && t(errors[0].text, errors[0].additionalData);

  return (
    <div className="group">
      {
        <label
          htmlFor={id}
          className={`block px-1 mb-2 text-base text-gb dark:text-white ${labelClasses}`}
        >
          {label}
        </label>
      }
      <div className="relative">
        {
          iconStart && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              { iconStart }
            </div>
          )
        }
        <input
          id={id}
          disabled={disabled}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClassList()}
        />
        {
          iconEnd && (
            <div className="flex absolute inset-y-0 right-0 items-center pr-3">
              { iconEnd }
            </div>
          )
        }
      </div>
      {
        helperText && (
          <p className={`p-2 text-error text-base ${helperTextClasses}`}>
            {helperText}
          </p>
        )
      }
    </div>
  );
};

export default BaseInput2;