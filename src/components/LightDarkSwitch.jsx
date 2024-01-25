import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function LightDarkSwitch() {
  const [mode, setMode] = useState(null);

  const { setTheme } = useTheme();

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    themeCheck();
  }, []);
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      setMode(false);
      return;
    }
    setMode(true);
  };

  function themeSwitch() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setMode(true);
      setTheme("light");

      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setMode(false);
    setTheme("dark");
  }
  return (
    <button
      onClick={themeSwitch}
      style={{
        justifyContent: mode ? "flex-start" : "flex-end",
        backgroundColor: mode ? "#fff" : "#313133",
      }}
      //   transition={{ duration: 0.5 }}
      className={"flex w-[48px] items-center h-[30px] p-[2.5px] rounded-full"}
    >
      {mode !== null && (
        <motion.div
          initial={false}
          layout
          style={{ backgroundColor: mode ? "#ffcb00" : "#0086ff" }}
          className='flex justify-center items-center h-[25px] w-[25px] p-[4px] rounded-full'
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {!mode ? (
            <MoonIcon className='w-[25px] stroke-[2px] stroke-[#fff]' />
          ) : (
            <SunIcon className='w-[25px] stroke-[2px] stroke-[#fff]' />
          )}
        </motion.div>
      )}
    </button>
  );
}
