import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faHandHoldingDollar,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React from "react";

export const EditButton = ({ onClick, isLight = false }) => {
  return (
    <button
      onClick={onClick}
      className={
        isLight
          ? "w-[30px] h-[30px] rounded-lg text-orange-500 bg-orange-500/10"
          : "w-[30px] h-[30px] rounded-lg bg-orange-500 text-white"
      }
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
};

export const DeleteButton = ({ onClick, isLight }) => {
  return (
    <button
      onClick={onClick}
      className={
        isLight
          ? "w-[30px] h-[30px] rounded-lg text-red-500 bg-red-500/10"
          : "w-[30px] h-[30px] rounded-lg bg-red-500 text-white"
      }
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
};

export const DeleteButtonText = ({ onClick, isLight, children }) => {
  return (
    <Button
      onClick={onClick}
      className={
        isLight
          ? " text-[14px] w-full text-red-500 bg-red-500/10"
          : " text-[14px] w-full bg-red-500 text-white"
      }
    >
      {children}
    </Button>
  );
};

export const FinishButtonText = ({ onClick, isLight, children }) => {
  return (
    <button
      onClick={onClick}
      className={
        isLight
          ? "p-2 text-[14px] w-full rounded-lg text-red-500 bg-red-500/10"
          : "p-2 text-[14px] w-full rounded-lg bg-red-500 text-white"
      }
    >
      {children}
    </button>
  );
};

export const LeaveButton = ({ onClick, isLight, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ opacity: disabled && 0.5 }}
      className={
        isLight
          ? "w-[30px] h-[30px] rounded-lg text-orange-500 bg-orange-500/20"
          : "w-[30px] h-[30px] rounded-lg bg-orange-500 text-white"
      }
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export const RecievePaymentButton = ({ onClick, isLight, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ opacity: disabled && 0.5 }}
      className={
        isLight
          ? "w-[30px] h-[30px] rounded-lg text-green-500 bg-green-500/20"
          : "w-[30px] h-[30px] rounded-lg bg-green-500 text-white"
      }
    >
      <FontAwesomeIcon icon={faHandHoldingDollar} />
    </button>
  );
};
