import React from "react";

export default function VerticalBoard({ children }) {
  return (
    <div className='flex flex-col font-space p-8 bg-foresty-white dark:bg-forestydark-500/80 rounded-[30px] gap-5'>
      {children}
    </div>
  );
}
