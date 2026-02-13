"use client";

import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import React, {ReactNode} from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title: string;
  children: ReactNode;
}

const CustomModal = ({isOpen, onClose, size, title, children}: IProps) => {
  return (
    <Modal isOpen={isOpen} isDismissable={false} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className={"border-b border-blue-100"}>
          <h3 className={"text-x1 font-semibold"}>{title}</h3>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
