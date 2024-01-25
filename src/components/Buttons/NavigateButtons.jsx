import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const NavigateCreateButton = ({ path, btnText = "Qo'shish" }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(path)}
      color='primary'
      endContent={<PlusIcon className='w-[18px]' />}
    >
      {btnText}
    </Button>
  );
};

export const NavigateViewButton = ({ path, isLight = false }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className={
        isLight
          ? "w-[30px] h-[30px] rounded-lg text-blue-500 bg-blue-500/10"
          : "w-[30px] h-[30px] rounded-lg bg-blue-500 text-white"
      }
    >
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
};
