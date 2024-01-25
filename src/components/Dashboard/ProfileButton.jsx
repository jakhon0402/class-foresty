import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import { getDefaultAvatar, getProfileAvatar } from "../../utils/profile";
import { ROLE } from "../../lib/roles";

export default function ProfileButton({ user }) {
  const loc = useLocation();
  const navigation = useNavigate();

  return (
    <button
      className={
        loc.pathname.startsWith(
          `${user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"}/profile`
        )
          ? "ml-2 group bg-foresty-500 dark:bg-foresty-500  flex flex-row items-center justify-between gap-3 p-2 transition duration-500 ease-in-out hover:drop-shadow-[0px_0px_15px_rgba(0,134,45,0.3)] box-content rounded-full"
          : " ml-2 group bg-white dark:bg-forestydark-500 dark:hover:bg-forestydark-400 flex flex-row items-center justify-between gap-3 p-2 transition duration-500 ease-in-out hover:drop-shadow-[0px_0px_15px_rgba(0,134,45,0.3)] box-content rounded-full"
      }
      onClick={() => {
        if (
          !(
            loc.pathname ===
            `${
              user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"
            }/profile`
          )
        ) {
          navigation(
            `${
              user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"
            }/profile`
          );
        }
      }}
    >
      <div className='flex flex-col ml-7 items-end justify-center leading-4'>
        <span
          className={
            loc.pathname.startsWith(
              `${
                user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"
              }/profile`
            )
              ? "text-[12px] font-raleway font-bold text-[#b4f1c8] dark:group-hover:text-foresty-white transition duration-500 ease-in-out"
              : "text-[12px] font-raleway font-bold text-fyTropic dark:text-forestydark-200 dark:group-hover:text-foresty-white transition duration-500 ease-in-out"
          }
        >
          {`${user?.user?.firstName} ${user?.user?.lastName}`}
        </span>
        <span
          className={
            loc.pathname.startsWith(
              `${
                user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"
              }/profile`
            )
              ? "text-[12px] font-raleway font-extrabold text-foresty-white transition duration-500 ease-in-out"
              : "text-[12px] font-raleway font-extrabold dark:text-[#3dd292] text-foresty-500 transition duration-500 ease-in-out"
          }
        >
          {user?.user?.role?.roleName}
        </span>
      </div>
      <Avatar
        isBordered
        size='md'
        src={getProfileAvatar(user?.profilePhoto)}
        color='success'
        className='cursor-pointer'
      />
    </button>
  );
}
