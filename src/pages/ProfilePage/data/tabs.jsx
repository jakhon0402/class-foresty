import {
  UserCircleIcon,
  CubeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  DocumentDuplicateIcon,
  RectangleStackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";

export const tabs = [
  {
    title: (
      <div className='flex items-center space-x-2'>
        <UserCircleIcon className='w-[20px]' />
        <span>{"Profil"}</span>
      </div>
    ),
    key: "profile",
  },

  {
    title: (
      <div className='flex items-center space-x-2'>
        <DocumentDuplicateIcon className='w-[20px]' />
        <span>{"Hujjatlar"}</span>
      </div>
    ),
    key: "documents",
  },

  {
    title: (
      <div className='flex items-center space-x-2'>
        <WrenchScrewdriverIcon className='w-[20px]' />
        <span>{"Sozlamalar"}</span>
      </div>
    ),
    key: "settings",
  },
];
