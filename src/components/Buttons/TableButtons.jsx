import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faHandHoldingDollar,
  faRightFromBracket,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const DownloadFileButton = ({ onClick, isLight, disabled }) => {
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
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
};
