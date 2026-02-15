import CustomModal from "@/components/common/Modal";
import LoginForm from "@UI/forms/LoginForm";
import React from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({isOpen, onClose}: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={"Login"}>
      <LoginForm onClose={onClose}/>
    </CustomModal>
  );
};

export default LoginModal;
