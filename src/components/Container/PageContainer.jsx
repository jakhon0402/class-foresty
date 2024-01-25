import React from "react";

export default function PageContainer({ children }) {
  return (
    <div className='flex flex-col gap-4 bg-fyTropic-200/50 dark:bg-forestydark-600 w-full p-5 pt-8 rounded-[30px] dark:text-foresty-white font-space'>
      {children}
    </div>
  );
}
