import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
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

const RemoveStudentFromGroupModal = ({
  button,
  handleSubmit,
  contextText,
  title = "Chetlashtirish",
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
              <ModalHeader className='flex flex-row gap-1 items-center'>
                <ExclamationCircleIcon className='w-[22px] text-yellow-500' />
                <span>{title}</span>
              </ModalHeader>
              <ModalBody className='flex flex-col items-center'>
                <span className='text-[16px] font-normal px-2'>
                  <span className='font-bold'>{contextText}</span>
                  {` ni guruhdan chetlashtirishni xohlaysizmi?`}
                </span>
                <span className='flex flex-row gap-3 w-full p-5 rounded-3xl bg-forestyWarning/20'>
                  <ExclamationCircleIcon className='flex-none text-forestyWarning w-[25px] h-[25px] stroke-[2px]' />
                  <span className='text-[12px] text-forestyWarning'>
                    {
                      "O'quvchini guruhdan chetlashtirishda uning shu oydagi to'lov ma'lumotlari saqlanadi va undan keyingi oydagi to'lov ma'lumotlari o'chiriladi!"
                    }
                  </span>
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  {"Bekor qilish"}
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={() => {
                    handleSubmit(onClose);
                  }}
                >
                  {"Chiqarish"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveStudentFromGroupModal;
