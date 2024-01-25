import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SidebarButton = ({ navigation, selected, shrink, text, element }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={false}
      style={{
        width: "100%",
        height: "45px",
        paddingLeft: "17.5px",
        paddingRight: "17.5px",
      }}
      className='flex flex-row relative'
    >
      {selected.val && (
        <motion.div
          initial={false}
          layoutId='outline'
          className='absolute w-[6px] h-[30px] bg-foresty-white dark:bg-[#00af57] left-0 top-[7.5px]  rounded-r-lg'
        ></motion.div>
      )}

      <motion.button
        initial={false}
        transition={{ duration: 0.5 }}
        animate={{
          paddingLeft: shrink ? "20px" : "10px",
          marginLeft: shrink ? "10px" : "0px",
          marginRight: shrink ? "10px" : "0px",
        }}
        className='flex flex-row items-center justify-start gap-5 rounded-xl hover:bg-green-400/80 dark:hover:bg-forestydark-500 active:bg-foresty-600  transition duration-300 ease-in-out'
        style={{
          width: "100%",
          height: "100%",
          paddingRight: "10px",
        }}
        onClick={() => {
          navigate(navigation);
        }}
      >
        <motion.div initial={false} layout style={{ width: "25px" }}>
          <span
            className={
              selected.val
                ? "dark:fill-neutral-100 fill-white w-[25px]"
                : "dark:fill-forestydark-200 fill-green-200 w-[25px]"
            }
          >
            {element}
            {/* <FontAwesomeIcon
              icon={element}
              className={
                selected.val
                  ? "dark:text-foresty-white text-foresty-white w-[25px]"
                  : "dark:text-forestydark-200 text-fyTropic-100 w-[25px]"
              }
              size='lg'
            /> */}
          </span>
        </motion.div>

        <AnimatePresence initial={false}>
          {shrink && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className={
                selected.val
                  ? "text-[15px] dark:text-forestydark-white text-white font-raleway font-bold whitespace-nowrap"
                  : "text-[15px] dark:text-forestydark-200 text-green-200  font-raleway font-bold whitespace-nowrap"
              }
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default SidebarButton;
