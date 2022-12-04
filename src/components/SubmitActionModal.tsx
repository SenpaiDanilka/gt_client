import React, {FC, ReactNode} from "react";
import BaseModal from "./BaseComponents/BaseModal";
import BaseButton from "./BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  children: ReactNode
}

const SubmitActionModal: FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  children
}) => {
  const {t} = useTranslation('common');

  return (
    <BaseModal
      open={open}
      onClose={onCancel}
    >
      <div className="p-4">
        {children}
        <div className="flex justify-center">
          <BaseButton
            variant="contained"
            className="mr-2"
            onClick={onSubmit}
          >
            {t('submit')}
          </BaseButton>
          <BaseButton
            variant="outlined"
            onClick={onCancel}
          >
            {t('cancel')}
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
}

export default SubmitActionModal;