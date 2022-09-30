import React, {ReactNode} from "react";
import BaseInput from "./BaseInput";
import {useTranslation} from "react-i18next";
import {ValidationFunction} from "../../models/CommonModels";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (val: string, key: string) => void;
  onBlur: (e: React.FocusEvent, rules?: ValidationFunction[]) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  formFieldsData: any[];
  controls?: ReactNode;
  className?: string;
}

const BaseForm: React.FC<Props> = ({
  onSubmit,
  onChange,
  formFieldsData,
  onBlur,
  controls,
  className,
  onKeyDown
}) => {
  const {t} = useTranslation('common');

  return (
    <form
      noValidate
      className={
      `${className} border-box flex flex-col items-center justify-between rounded-xl`
    }
      onKeyDown={onKeyDown}
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        {
          formFieldsData.map(field => (
            <BaseInput
              id={field.id}
              label={t(field.id)}
              value={field.data.value}
              onChange={(val) => onChange(val, field.id)}
              onBlur={(e) => onBlur(e, field.rules)}
              autoFocus={field.autofocus}
              iconEnd={field.iconEnd}
              type={field.type}
              errors={field.data.errors}
              key={field.id}
              required
            />
          ))
        }
      </div>
      { controls }
    </form>
  );
}

export default BaseForm;