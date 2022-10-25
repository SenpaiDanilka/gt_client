import {InputAdornment, TextField} from "@mui/material";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {ValidationError} from "../../models/CommonModels";

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
  errors?: ValidationError[];
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
  children?: ReactNode | ReactNode[];
  isSelect?: boolean;
  disableUnderline?: boolean;
}

const textFieldSX = {
  '& .MuiInputBase-root': {
    '&::before': {
      borderColor: '#A5B4CA'
    },
    '&::after': {
      borderColor: '#6284FF'
    },
    '&:hover': {
      borderColor: '#6284FF'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#6284FF'
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',

    '& fieldset': {
      borderColor: '#A5B4CA',
    },
    '&:not(.Mui-disabled):not(.Mui-error):hover fieldset' : {
      borderColor: '#6284FF',
    },
    '&:not(.Mui-error).Mui-focused fieldset': {
      borderColor: '#6284FF',
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
  minRows,
  placeholder,
  children,
  isSelect,
  disableUnderline
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
    className: 'rounded-xl text-mgb dark:text-white dark:bg-dark-bg',
    ...(variant === 'filled' || variant === 'standard'
      ? { disableUnderline: disableUnderline }
      : {})
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
      placeholder={placeholder}
      className={className}
      select={isSelect}
      children={children}
    />
  );
}

export default BaseInput;