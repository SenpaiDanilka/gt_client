import React, {ReactNode} from "react";
import BaseInput from "./BaseInput";
import {useTranslation} from "react-i18next";
import {ValidationRule} from "../../models/CommonModels";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (val: string, key: string) => void;
  onBlur: (e: React.FocusEvent, rules: ValidationRule[]) => void;
  onFocus?: (e: React.FocusEvent) => void;
  formFieldsData: any[];
  controls?: ReactNode,
  className?: string
}

const BaseForm: React.FC<Props> = ({
  onSubmit,
  onChange,
  formFieldsData,
  onBlur,
  onFocus,
  controls,
  className
}) => {
  const {t} = useTranslation('common');

  return (
    <form
      className={
      `${className} border-box bg-white p-8 flex flex-col items-center justify-between rounded-xl shadow-xl`
    }
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
              onFocus={onFocus}
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