import React, { useEffect, useState } from "react";
import { getMenuList } from "./data";
import { useLocation } from "react-router-dom";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import { Spacer } from "@nextui-org/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SidebarButton from "./SidebarButton";
import { useSelector } from "react-redux";
import logo from "../../assets/foresty.svg";
import { ROLE } from "../../lib/roles";

const Sidebar = ({ user }) => {
  const location = useLocation();

  const menu = getMenuList(user?.user?.role?.roleName);
  const [shrink, setShrink] = useState(false);
  const [selection, setSelection] = useState([
    true,
    ...Array(menu?.length - 1).fill(false),
  ]);

  function selectMenu(index) {
    setSelection(selection.map((item, i) => (i === index ? true : false)));
  }

  useEffect(() => {
    let k = 0;
    for (let i = 0; i < menu?.length; i++) {
      if (
        location.pathname.startsWith(
          `${user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"}${
            menu[i].to
          }`
        )
      ) {
        selectMenu(i);
        k++;
      }
    }
    if (k == 0) {
      setSelection(selection.map(() => false));
    }
  }, [location]);

  return (
    <motion.div
      initial={false}
      animate={{
        width: shrink ? "280px" : "80px",
      }}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: "20px" }}
      className='flex flex-col relative justify-start items-center bg-green-600 dark:bg-neutral-900 py-[13px] h-fit'
    >
      <div className='absolute z-[20] w-[34px] h-[34px] bg-[#B8D8C4] dark:bg-[#0f0f0f] right-0 top-[76px] translate-x-[50%] rounded-l-full'></div>
      <div className='absolute z-[20] w-[8px] h-[8px] bg-green-600 dark:bg-neutral-900 right-0 top-[69.2px] rounded-br-full shadow-[2px_2px_rgba(184,216,196,1)] dark:shadow-[2px_2px_rgba(15,15,15,1)]'></div>
      <div className='absolute z-[20] w-[8px] h-[8px] bg-green-600 dark:bg-neutral-900 right-0 top-[108.9px] rounded-tr-full shadow-[2px_-2px_rgba(184,216,196,1)] dark:shadow-[2px_-2px_rgba(15,15,15,1)]'></div>

      <motion.button
        initial={false}
        // animate={{ marginRight: shrink ? "-275px" : "-75px" }}
        transition={{ duration: 0.5 }}
        className='absolute w-[26px] h-[26px] z-[50] bg-white dark:bg-foresty-600 top-[80px] right-0 translate-x-[50%] rounded-full shadow-lg p-[5px]'
        onClick={() => setShrink(!shrink)}
      >
        <ChevronRightIcon
          style={{ rotate: shrink ? "-180deg" : "0deg" }}
          className='stroke-[3px] stroke-green-500 dark:stroke-foresty-white'
        />
      </motion.button>

      <div className='w-[50px] h-[50px] bg-[#fff] p-[8px] rounded-xl shadow-lg dark:shadow-foresty-600/80'>
        <img src={logo} alt='foresty_logo' />
      </div>
      <Spacer y='40px' />

      <motion.div
        initial={false}
        animate={{
          width: shrink ? "280px" : "80px",
        }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-start gap-1'
      >
        <LayoutGroup initial={false}>
          {menu.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <SidebarButton
                  selected={{ key: index, val: selection[index] }}
                  shrink={shrink}
                  text={item.name}
                  element={item.icon}
                  navigation={`${
                    user?.user?.role?.roleName == ROLE.TEACHER ? "/t" : "/s"
                  }${item.to}`}
                />
                {index === menu?.length - 2 && <Spacer y='50px' />}
              </React.Fragment>
            );
          })}
        </LayoutGroup>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
