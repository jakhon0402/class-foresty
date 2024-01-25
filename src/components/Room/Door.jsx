import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";

export default function Door({ door }) {
  const [showButtons, setShowButtons] = useState(false);

  //   const [floors, setFloors] = useState([
  //     { number: 0, isSelected: false },
  //     { number: 1, isSelected: false },
  //     { number: 2, isSelected: false },
  //     { number: 3, isSelected: false },
  //     { number: 4, isSelected: false },
  //     { number: 5, isSelected: false },
  //   ]);

  //   const [roomData, handleChange, setRoomData] = useForm({
  //     number: "",
  //     name: "",
  //   });

  //   const selectFloor = (index) => {
  //     setFloors(
  //       floors.map((el, subin) => {
  //         index === subin ? (el.isSelected = true) : (el.isSelected = false);
  //         return el;
  //       })
  //     );
  //   };

  //   const clearRoomData = () => {
  //     setRoomData({
  //       number: "",
  //       name: "",
  //     });
  //     setFloors(
  //       floors.map((el) => {
  //         el.isSelected = false;
  //         return el;
  //       })
  //     );
  //   };

  return (
    <div
      onClick={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className='group relative flex-none flex flex-col items-center pt-10 w-[120px] h-[180px] bg-foresty-white dark:bg-forestydark-400/80 border-[1.5px] border-foresty-500/50 border-b-0 rounded-t-xl z-0'
    >
      {/* <div className='hidden group-hover:flex flex-row gap-3 z-10 absolute bottom-2 left-[50%] translate-x-[-50%] p-1 rounded-xl bg-white dark:bg-neutral-700 shadow-md transition-all duration-200 ease-in-out'>
   
      </div> */}
      <div className='absolute flex flex-row items-center top-[100px] left-3 z-10'>
        <span className='relative w-[15px] h-[15px] bg-foresty-400/50 rounded-full'>
          <span className='absolute translate-y-[-50%] left-[7.5px] top-[50%] w-[18px] h-[7px] bg-foresty-400 rounded-full ml-[-3px] z-20  group-hover:rotate-45 origin-left' />
        </span>
      </div>

      <span className='px-2 py-[1px] rounded-sm text-[18px] bg-foresty-600 font-bold text-foresty-white'>
        {door.roomNumber}
      </span>
      <span className='px-2 py-[1px] rounded-sm text-[10px] bg-foresty-600/10 font-bold text-foresty-600 dark:text-foresty-white'>
        {door.roomName}
      </span>
    </div>
  );
}
