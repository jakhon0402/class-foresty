import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function HeaderButton({ icon, visited, to }) {
  const navigation = useNavigate();

  return (
    // <Badge
    //   disableOutline
    //   content="12"
    //   size="sm"
    //   color="error"
    //   css={{ backgroundColor: "#f5004d" }}
    // >
    <button
      onClick={() => {
        if (!visited) {
          navigation(to);
        }
      }}
      className={
        visited
          ? "group w-[38px] h-[38px] bg-foresty-500  hover:bg-foresty-500/80 rounded-xl transition duration-300 ease-in-out hover:shadow-lg hover:shadow-foresty-500/50 dark:hover:shadow-fyTropic/50"
          : "group w-[38px] h-[38px] bg-[#e4f1e5] dark:bg-forestydark-500 dark:hover:bg-forestydark-400 hover:bg-fyTropic-200 rounded-xl transition duration-300 ease-in-out hover:shadow-lg hover:shadow-foresty-500/50 dark:hover:shadow-fyTropic/50"
      }
    >
      <FontAwesomeIcon
        icon={icon}
        size='lg'
        className={
          visited
            ? "text-foresty-white  dark:group-hover:text-fyTropic-200 shadow-lg transition duration-300 ease-in-out"
            : "text-fyTropic dark:text-[#787e89] dark:group-hover:text-fyTropic-200 shadow-lg transition duration-300 ease-in-out"
        }
      />
    </button>
    // </Badge>
  );
}
