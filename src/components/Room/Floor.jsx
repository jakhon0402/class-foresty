import { ScrollShadow } from "@nextui-org/react";
import React from "react";

export default function Floor({ children, floor }) {
  return (
    <div className='relative w-full h-[250px] bg-[#d7d7d7]/20 dark:bg-forestydark-500 rounded-lg'>
      <span className='absolute top-3 right-5 text-[14px] text-foresty-600 dark:text-foresty-white font-bold'>
        {`${floor}-qavat`}
      </span>
      <ScrollShadow
        size={80}
        orientation='horizontal'
        className='absolute flex flex-row items-end bottom-[20px] w-full h-[180px] px-8 gap-14 overflow-scroll scrollbar-hide'
      >
        {children}
      </ScrollShadow>
      <div className='absolute w-full bg-[#e78c00]/20 dark:bg-[#e78c00]/10 border-t-[1px] border-[#e78c00] dark:border-[#e78c00]/20 h-[20px] bottom-0 rounded-b-lg'></div>
    </div>
  );
}
