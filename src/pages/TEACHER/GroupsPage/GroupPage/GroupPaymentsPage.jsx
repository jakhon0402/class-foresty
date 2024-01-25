import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForestyTable from "../../../../components/Table/ForestyTable";
import {
  getGroupLessons,
  getGroupMonths,
  getGroupPaymentMonths,
  getGroupStudentPaymentByMonth,
  receiveGroupStudentPayment,
} from "../groupsSlice";
import { ScrollShadow } from "@nextui-org/react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { dateString, getDates, getPaymentDate } from "../../../../utils/date";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "../data/paymentsTable";

const GroupPaymentsPage = ({ groupId }) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const {
    paymentMonths,
    lessons,
    studentPayments,
    paymentsLoading,
    paymentLoading,
  } = useSelector((state) => state.tgroups);
  const { theme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    groupId && dispatch(getGroupPaymentMonths(groupId));
  }, []);

  const changeMonth = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    if (paymentMonths && paymentMonths.length !== 0) {
      dispatch(
        getGroupStudentPaymentByMonth(
          paymentMonths.find((el) => el?.groupMonth?.month === selectedMonth)
            ?.id
        )
      );
      selectedMonth === 0 &&
        setSelectedMonth(
          paymentMonths.find((el) => el?.groupMonth?.isCurrent)?.groupMonth
            ?.month
        );
    }
  }, [selectedMonth, paymentMonths]);

  return paymentMonths && paymentMonths.length != 0 ? (
    <div className='flex flex-col w-full gap-5'>
      {" "}
      <div className='flex relative w-full h-[90px]'>
        <ScrollShadow
          size={80}
          orientation='horizontal'
          className='absolute flex flex-row bg-foresty-500/20 dark:bg-forestydark-800 rounded-[20px] items-end w-full h-[90px] p-[5px] gap-3 overflow-scroll scrollbar-hide'
        >
          {paymentMonths &&
            paymentMonths

              .map((el) => {
                if (el.groupMonth?.month == selectedMonth) {
                  return { ...el, isSelected: true };
                } else {
                  return { ...el, isSelected: false };
                }
              })
              .map((el) => (
                <button
                  onClick={() =>
                    !el.isSelected && changeMonth(el.groupMonth?.month)
                  }
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
                  <span className='text-[16px] font-bold'>{`${el.groupMonth?.month}-oy`}</span>

                  <span className='text-[12px]'>
                    {
                      getPaymentDate(
                        el.groupMonth?.fromDate,
                        el.groupMonth?.toDate
                      )[0]
                    }
                  </span>
                  <span className='text-[10px] font-bold'>
                    {
                      getPaymentDate(
                        el.groupMonth?.fromDate,
                        el.groupMonth?.toDate
                      )[1]
                    }
                  </span>
                </button>
              ))}
        </ScrollShadow>
      </div>
      {studentPayments && selectedMonth && (
        <div className='bg-white p-5 rounded-3xl dark:bg-neutral-800/50'>
          <ForestyTable
            isStriped
            dataLoading={paymentsLoading}
            extraData={(() => {
              let pm = paymentMonths.find(
                (el) => el?.groupMonth?.month === selectedMonth
              );

              if (pm) {
                return {
                  type: "payment",
                  data: [
                    `${pm?.groupMonth?.month}-oy`,

                    `${
                      getPaymentDate(
                        pm?.groupMonth?.fromDate,
                        pm?.groupMonth?.toDate
                      )[0]
                    } ${
                      getPaymentDate(
                        pm?.groupMonth?.fromDate,
                        pm?.groupMonth?.toDate
                      )[1]
                    }`,
                  ],
                };
              }
            })()}
            searchIndexes={searchIndexes}
            //   viewButton={(id) => (
            //     <NavigateViewButton isLight path={`/students/${id}`} />
            //   )}

            tableData={studentPayments}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            editButton={null}
            deleteButton={null}
          />
        </div>
      )}
      {/* <div className='grid grid-cols-7 gap-5 p-5 place-items-center'>
        {[1, 2, 3, 4, 5, 6, 7].map((el, index) => (
          <div className='flex justify-center items-center w-full h-[50px] bg-white dark:bg-neutral-700 rounded-xl'>
            {getWeekDayAbb(index)}
          </div>
        ))}
      </div> */}
      {/* <div className='grid grid-cols-7 gap-5 p-5 place-items-center '>
        {lessons &&
          months &&
          getDates(
            months.find((el) => el.month === selectedMonth)?.fromDate,
            months.find((el) => el.month === selectedMonth)?.toDate
          ).map((el, index) => (
            <div
              style={{ gridColumnStart: index === 0 && el.getDay() + 1 }}
              className={
                lessons.find((l) => new Date(l.date).getTime() === el.getTime())
                  ? "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl bg-orange-600"
                  : "flex flex-col justify-center items-center w-full h-[80px] rounded-2xl bg-neutral-600"
              }
            >
              <span>{dateString(el)}</span>
              {lessons.find(
                (l) => new Date(l.date).getTime() === el.getTime()
              ) && (
                <span>
                  {`${getHourMinuteFromTime(
                    lessons.find(
                      (l) => new Date(l.date).getTime() === el.getTime()
                    ).fromTime
                  )} - ${getHourMinuteFromTime(
                    lessons.find(
                      (l) => new Date(l.date).getTime() === el.getTime()
                    ).toTime
                  )}`}
                </span>
              )}
            </div>
          ))}
      </div> */}
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <span>{"Ma'lumotlar mavjud emas!"}</span>
    </div>
  );
};

export default GroupPaymentsPage;
