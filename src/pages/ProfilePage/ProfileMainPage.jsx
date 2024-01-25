import React from "react";
import { joinedDate } from "../../utils/date";
import { Avatar, Code, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { getPhoneNumberPattern } from "../../utils/regex";
import { getProfileAvatar } from "../../utils/profile";
import { regions } from "./data/regions";
import { AddressIcon } from "../../components/Icons/profileIcons";

const ProfileMainPage = ({ user }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row w-full gap-8'>
        <div className='flex flex-col flex-none w-[300px] h-fit items-center bg-foresty-white dark:bg-forestydark-500 rounded-[30px]'>
          <div className='flex flex-col w-full px-8 py-12 items-center gap-8 bg-gradient-to-t from-foresty-400/20 dark:from-[#3d653f]/20 rounded-[30px]'>
            <Avatar
              className='w-[90px] h-[90px]'
              size='lg'
              src={getProfileAvatar(user?.profilePhoto)}
              isBordered
              color='success'
            />
            <div className='flex flex-col gap-3 items-center'>
              <span className='flex gap-2 text-[18px] text-center font-bold text-fyTropic dark:text-foresty-white'>
                {user?.user?.lastName +
                  " " +
                  user?.user?.firstName +
                  " " +
                  user?.user?.fatherName}{" "}
                {/* <UserStatus status={teacher?.status} isText={false} /> */}
              </span>
              <span className='flex gap-3 items-center text-[12px] font-bold text-forestydark-100'>
                {user?.user?.role?.roleName}
                {/* <NetworkStatus isOnline={true} /> */}
              </span>
            </div>
            <div className='flex flex-row gap-5 px-2'>
              <span className='flex flex-row items-center text-[12px] gap-2 font-semibold dark:text-foresty-white text-forestydark-300'>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='mr-1 text-[18px] text-forestydark-100'
                />
                {`Qo'shilgan ${joinedDate(user?.created_at)}`}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center w-full rounded-[30px] px-8 py-10 bg-white dark:bg-neutral-800/60'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='w-full flex flex-col justify-center items-center'>
              <span className='text-[12px]'>{"Username"}</span>
              <Code color='default' className='mt-1'>
                {" "}
                {user?.user?.username}
              </Code>
            </div>

            <Divider className='my-1' />
            <div className='w-full flex flex-col justify-center items-center'>
              <span className='text-[12px]'>{"Email"}</span>
              <Code size='sm' hideSymbol color='default' className='mt-1'>
                {user?.user?.email}
              </Code>
            </div>
            <Divider className='my-1' />

            <div className='w-full flex flex-col justify-center items-center'>
              <span className='text-[12px]'>{"Tug'ilgan sanasi"}</span>
              <span className='text-[14px] font-space font-semibold text-amber-500'>
                {joinedDate(user?.user?.birthDate)}
              </span>
            </div>
            <Divider className='my-1' />

            <div className='w-full flex flex-col justify-center items-center'>
              <span className='text-[12px]'>{"Tel. raqami"}</span>
              <Code color='success' className='mt-1'>
                {getPhoneNumberPattern(user?.user?.phoneNumber)}
              </Code>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 w-full items-center rounded-[30px] px-8 py-12 bg-white dark:bg-neutral-800/60'>
          <AddressIcon width={50} height={50} />
          {user?.address && (
            <div className='flex flex-col gap-2 w-full'>
              <div className='w-full flex flex-col justify-center items-center'></div>
              <div className='w-full flex flex-col justify-center items-center'>
                <span className='text-[12px]'>{"Viloyat"}</span>
                <span className='text-[14px] font-space font-semibold text-amber-500'>
                  {regions.find((el) => el.id == user?.address?.region).name}
                </span>
              </div>
              <Divider className='my-1' />
              <div className='w-full flex flex-col justify-center items-center'>
                <span className='text-[12px]'>{"Shahar yoki tuman"}</span>
                <span className='text-[14px] font-space font-semibold text-amber-500'>
                  {user?.address?.districtOrCity}
                </span>
              </div>
              <Divider className='my-1' />
              <div className='w-full flex flex-col justify-center items-center'>
                <span className='text-[12px]'>{"Ko'cha / manzil"}</span>
                <span className='text-[14px] font-space font-semibold text-amber-500'>
                  {user?.address?.street}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMainPage;
