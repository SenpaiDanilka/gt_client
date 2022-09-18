import {InputAdornment, TextField} from "@mui/material";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface BaseInputPropsType {
  id?: string;
  label?: string;
  variant?: "standard" | "filled" | "outlined";
  value: string;
  type?: string;
  onChange: (val: string) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  required?: boolean;
  errors?: any[];
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
}

const textFieldSX = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',

    '& fieldset': {
      borderColor: '#6B7280',
    },
    '&:not(.Mui-disabled):not(.Mui-error):hover fieldset' : {
      borderColor: '#3B82F6',
    },
    '&:not(.Mui-error).Mui-focused fieldset': {
      borderColor: '#2563EB',
    }
  },
};

const BaseInput: React.FC<BaseInputPropsType> = ({
  id,
  disabled,
  label,
  variant,
  onChange,
  onBlur,
  onFocus,
  value,
  type,
  required,
  errors= [],
  iconStart,
  iconEnd,
  className,
  autoFocus,
  rows,
  maxRows,
  multiline,
  minRows
}) => {
  const {t} = useTranslation('validations');
  const inputProps = {
    startAdornment: iconStart
      ? (
        <InputAdornment position="start">{iconStart}</InputAdornment>
      ) : null,
    endAdornment: iconEnd
      ? (
        <InputAdornment position="end">{iconEnd}</InputAdornment>
      ) : null,
    className: "rounded-xl"
  };

  const helperText = !!errors.length && t(errors[0].text, errors[0].additionalData);

  return (
    <TextField
      id={id}
      autoFocus={autoFocus}
      disabled={disabled}
      sx={textFieldSX}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      multiline={multiline}
      size="small"
      fullWidth
      label={label}
      variant={variant}
      onChange={(e) => !disabled && onChange(e.target.value)}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      type={type}
      required={required}
      error={!!errors.length}
      helperText={helperText}
      InputProps={inputProps}
      className={className}
    />
  );
}

export default BaseInput;