import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ForestyForm from "../Form/ForestyForm";

const CreateEditModal = ({
  title,
  loading,
  button,
  btnText,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  submitBtnText,
  colsNum = 1,
  size = "lg",
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
          <ForestyForm
            isLoading={loading}
            colsNum={colsNum}
            initialValues={{
              ...initialValues,
            }}
            fields={fields}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
            submitBtnText={submitBtnText}
            modalData={{ onClose }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEditModal;
