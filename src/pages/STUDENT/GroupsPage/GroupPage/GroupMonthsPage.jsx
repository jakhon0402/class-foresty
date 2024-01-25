import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupLessons, getGroupMonths } from "../groupsSlice";
import { ScrollShadow } from "@nextui-org/react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { dateString, getDates, getPaymentDate } from "../../../../utils/date";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  getHourMinuteFromTime,
  getWeekDayAbb,
} from "../../../../utils/lessonTime";

const GroupMonthsPage = ({ groupId }) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const { months, lessons } = useSelector((state) => state.sgroups);
  const { theme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    groupId && dispatch(getGroupMonths(groupId));
  }, []);

  const changeMonth = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    if (months) {
      if (months.find((el) => el.month === selectedMonth)?.id) {
        dispatch(
          getGroupLessons(months.find((el) => el.month === selectedMonth)?.id)
        );
      }

      selectedMonth === 0 &&
        setSelectedMonth(months.find((el) => el.isCurrent)?.month);
    }
  }, [selectedMonth, months]);

  return (
    <div className='flex flex-col w-full gap-5'>
      {" "}
      <div className='flex relative w-full h-[90px]'>
        <ScrollShadow
          size={80}
          orientation='horizontal'
          className='absolute flex flex-row bg-foresty-500/20 dark:bg-forestydark-800 rounded-[20px] items-end w-full h-[90px] p-[5px] gap-3 overflow-scroll scrollbar-hide'
        >
          {months &&
            months
              .map((el) => {
                if (el.month == selectedMonth) {
                  return { ...el, isSelected: true };
                } else {
                  return { ...el, isSelected: false };
                }
              })
              .map((el) => (
                <button
                  onClick={() => !el.isSelected && changeMonth(el.month)}
                  key={el.id}
                  style={{
                    backgroundColor: el.isSelected
                      ? theme === "dark"
                        ? "#2f2f2f"
                        : "#ffffff"
                      : theme === "dark"
                      ? "#1f1f1f"
                      : "#ffffffcc",
                    border:
                      el.status == "COMPLETED"
                        ? "1px solid #00a652"
                        : el.status == "UNCOMPLETED"
                        ? "1px solid #fc9500"
                        : null,
                  }}
                  className='flex flex-col relative flex-none justify-center items-center rounded-xl w-[130px] h-[80px] dark:bg-forestydark-500 dark:text-foresty-white bg-foresty-white/80'
                >
                  {el.status == "COMPLETED" ? (
                    <span className='absolute top-[5px] right-[5px]'>
                      <CheckCircleIcon className='w-[20px] h-[20px] text-foresty-500' />
                    </span>
                  ) : el.status == "UNCOMPLETED" ? (
                    <span className='absolute top-[5px] right-[5px]'>
                      <ExclamationCircleIcon className='w-[20px] h-[20px] text-forestyWarning' />
                    </span>
                  ) : null}
                  <span className='text-[16px] font-bold'>{`${el.month}-oy`}</span>

                  <span className='text-[12px]'>
                    {getPaymentDate(el.fromDate, el.toDate)[0]}
                  </span>
                  <span className='text-[10px] font-bold'>
                    {getPaymentDate(el.fromDate, el.toDate)[1]}
                  </span>
                </button>
              ))}
        </ScrollShadow>
      </div>
      <div className='flex flex-col gap-5 bg-white dark:bg-neutral-800/50 rounded-3xl'>
        {" "}
        <div className='grid grid-cols-7 gap-5 p-5 place-items-center'>
          {[1, 2, 3, 4, 5, 6, 7].map((el, index) => (
            <div
              key={index}
              className='flex justify-center items-center w-full h-[50px] bg-neutral-200 dark:bg-neutral-700 rounded-xl'
            >
              {getWeekDayAbb(index)}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-5 p-5 place-items-center '>
          {lessons &&
            months &&
            getDates(
              months.find((el) => el.month === selectedMonth)?.fromDate,
              months.find((el) => el.month === selectedMonth)?.toDate,
              months.find((el) => el.month === selectedMonth)?.status
            ).map((el, index) => {
              let lesson = lessons.find(
                (l) => new Date(l.date).getTime() === el.date.getTime()
              );
              return (
                <div
                  key={index}
                  style={{
                    gridColumnStart: index === 0 && el.date.getDay() + 1,
                  }}
                  className={
                    lesson
                      ? lesson.status == "PROCESS"
                        ? "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl text-[14px] bg-yellow-500/50 border-[1px] border-yellow-500"
                        : lesson.status == "HELD"
                        ? "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl text-[14px] bg-green-600/50 border-[1px] border-green-500"
                        : "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl text-[14px] bg-red-600/50 border-[1px] border-red-500"
                      : "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl text-[14px] bg-neutral-100 dark:bg-neutral-700/60 text-neutral-400 dark:text-neutral-500"
                  }
                >
                  <span>{dateString(el.date)}</span>
                  {lesson && (
                    <span className='text-[14px] font-bold'>
                      {`${getHourMinuteFromTime(
                        lesson.fromTime
                      )} - ${getHourMinuteFromTime(lesson.toTime)}`}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupMonthsPage;
