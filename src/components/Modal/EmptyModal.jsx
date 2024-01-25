import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const EmptyModal = ({
  title,
  content,
  submitBtnText,
  button,
  btnText,
  size = "md",
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      {button ? (
        React.cloneElement(button, { onClick: onOpen })
      ) : (
        <Button
          onClick={onOpen}
          color='primary'
          endContent={<PlusIcon className='w-[18px]' />}
        >
          {btnText}
        </Button>
      )}
      <Modal
        size={size}
        className='z-[5000]'
        placement='top-center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            <span className='text-[16px] font-bold'>{title}</span>
          </ModalHeader>
          {content(onClose)}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmptyModal;
