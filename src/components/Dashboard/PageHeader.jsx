import React from "react";

export default function PageHeader({ title, count = 0 }) {
  return (
    <div className='flex flex-row justify-center items-center w-fit gap-3 ml-5 mt-2'>
      <span className=' text-fyTropic dark:text-foresty-white text-[22px] font-bold'>
        {title}
      </span>
      {count >= 0 && (
        <span className='px-2 py-[2px] text-[14px] text-foresty-white bg-foresty-500 font-bold rounded-full'>
          {count}
        </span>
      )}
    </div>
  );
}
