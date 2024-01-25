import {
  CubeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

export const tabs = [
  {
    title: (
      <div className='flex items-center space-x-2'>
        <CubeIcon className='w-[20px]' />
        <span>{"Guruh ma'lumotlari"}</span>
      </div>
    ),
    key: "details",
  },
  {
    title: (
      <div className='flex items-center space-x-2'>
        <UserGroupIcon className='w-[20px]' />
        <span>{"O'quvchilar"}</span>
      </div>
    ),
    key: "students",
  },
  {
    title: (
      <div className='flex items-center space-x-2'>
        <CalendarDaysIcon className='w-[20px]' />
        <span>{"Dars vaqtlari"}</span>
      </div>
    ),
    key: "lessonTimes",
  },
  {
    title: (
      <div className='flex items-center space-x-2'>
        <BanknotesIcon className='w-[20px]' />
        <span>{"To'lovlar"}</span>
      </div>
    ),
    key: "payments",
  },

  {
    title: (
      <div className='flex items-center space-x-2'>
        <BanknotesIcon className='w-[20px]' />
        <span>{"O'quvchi to'lovlari"}</span>
      </div>
    ),
    key: "studentPayments",
  },
  // {
  //   title: (
  //     <div className='flex items-center space-x-2'>
  //       <WrenchScrewdriverIcon className='w-[20px]' />
  //       <span>{"Sozlamalar"}</span>
  //     </div>
  //   ),
  //   key: "settings",
  // },
];

export const weekDays = ["Yak", "Du", "Se", "Chor", "Pay", "Ju", "Sha"];
