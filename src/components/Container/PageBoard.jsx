import React from "react";

export default function PageBoard({ children }) {
  return (
    <div className='flex flex-col bg-white/90 dark:bg-forestydark-500/80 rounded-xl gap-3 px-8 py-5 '>
      {children}
    </div>
  );
}
