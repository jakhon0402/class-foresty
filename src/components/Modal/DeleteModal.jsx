import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import React from "react";

const DeleteModal = ({
  warningText,
  button,
  handleSubmit,
  contextText,
  submitText = "O'chirish",
  title = "O'chirish",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {button ? (
        React.cloneElement(button, { onClick: onOpen })
      ) : (
        <button
          onClick={onOpen}
          className='text-lg text-danger cursor-pointer active:opacity-50'
        >
          <TrashIcon className='w-[18px]' />
        </button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>
                {warningText ? (
                  <span>{warningText}</span>
                ) : (
                  <span className='text-[16px] font-normal'>
                    <span className='font-bold'>{contextText}</span>
                    {` o'chirishni xohlaysizmi?`}
                  </span>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  {"Bekor qilish"}
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  {submitText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
