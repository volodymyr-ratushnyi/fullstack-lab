import CustomModal from "@/components/common/Modal";
import RegistrationForm from "@UI/forms/RegistrationForm";
import React from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({isOpen, onClose}: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={"Sign up"}>
      <RegistrationForm onClose={onClose}/>
    </CustomModal>
  );
};

export default RegistrationModal;
