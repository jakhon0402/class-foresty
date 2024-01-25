import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Chip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import date from "date-and-time";
import { getGroupLessonTimes, getGroupTeacher } from "../groupsSlice";
import { getColorStatus } from "../../../../utils/status";
import { sentenceCase } from "../../../../utils/data";
import { getMoneyPattern } from "../../../../utils/regex";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import {
  getHourMinuteFromTime,
  getLessonTimesString,
  getWeekDayAbb,
} from "../../../../utils/lessonTime";
import { v4 } from "uuid";
import { weekDays } from "../data/group";
import { getProfileAvatar } from "../../../../utils/profile";

const DetailsPage = ({ group }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teacher, lessonTimes } = useSelector((state) => state.sgroups);

  useEffect(() => {
    group && dispatch(getGroupTeacher(group?.id));
    group && dispatch(getGroupLessonTimes(group?.id));
  }, []);
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row justify-around w-full gap-5 flex-wrap'>
        <div className='flex flex-col w-[300px] gap-5 bg-white/50 dark:bg-neutral-800/50 p-2 rounded-[30px]'>
          <div className='flex flex-col gap-1 overflow-hidden relative w-full h-[50%] bg-white dark:bg-neutral-700/40 rounded-3xl p-5 px-8'>
            <span className='text-[24px]'>{group?.name}</span>
            <span className='text-[14px] text-neutral-400 mt-[-5px]'>
              {group?.type == "subject" ? "Fan asosida" : "Kurs asosida"}
            </span>

            <Chip
              style={{
                backgroundColor:
                  group?.[group?.type]?.color?.lightHexCode + "40",
                // color: group?.[group?.type]?.color?.hexCode,
              }}
              className='dark:text-white text-neutral-600'
            >
              {group?.[group?.type]?.name}
            </Chip>
            {/* <div className='blur-2xl top-[-40px] right-[-40px] absolute w-[80px] h-[80px] rounded-full bg-green-500'></div> */}
            <div
              style={{ backgroundColor: group?.[group?.type]?.color?.hexCode }}
              className='bottom-[-65px] right-[-65px] absolute w-[130px] h-[130px] rounded-full bg-yellow-500 opacity-20'
            ></div>
            <div
              style={{ backgroundColor: group?.[group?.type]?.color?.hexCode }}
              className='bottom-[-50px] right-[-50px] absolute w-[100px] h-[100px] rounded-full bg-yellow-500 opacity-50'
            ></div>
            <div
              style={{ backgroundColor: group?.[group?.type]?.color?.hexCode }}
              className='bottom-[-40px] right-[-40px] absolute w-[80px] h-[80px] rounded-full bg-yellow-500'
            ></div>
          </div>
          <div className='flex flex-row w-[full] h-[50%] gap-5'>
            <div className='flex flex-col gap-1 items-center justify-center w-[50%] bg-white dark:bg-neutral-700/40 rounded-3xl p-5'>
              <span className='text-[12px] text-center'>
                {"Dars boshlanish sanasi"}
              </span>
              <span className='text-[14px] text-center text-orange-500 dark:text-orange-400 font-semibold'>
                {date.format(new Date(group?.startDate), "ddd, MMM DD YYYY")}
              </span>
            </div>
            <div className='flex flex-col items-center justify-center w-[50%] bg-white dark:bg-neutral-700/40 rounded-3xl p-5'>
              <span className='text-[12px] text-center'>{"Sinov muddati"}</span>
              <span className='text-[24px] text-center text-blue-500 dark:text-blue-400 font-semibold'>
                {`${group?.testDaysCount} kun`}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-[300px] gap-5 bg-white/50 dark:bg-neutral-800/50 p-2 rounded-[30px]'>
          <div className='flex flex-col relative gap-1 items-start justify-center h-[50%] bg-white dark:bg-neutral-700/40 rounded-3xl p-5 px-8'>
            <div className='flex justify-center items-center w-[40px] h-[40px] rounded-full absolute top-2 right-2 bg-neutral-100 dark:bg-neutral-600'>
              <BanknotesIcon className='w-[20px] text-neutral-500 dark:text-neutral-300' />
            </div>
            <span className='text-[14px] text-center'>{"Oylik narxi"}</span>
            <span className='text-[24px] text-center text-orange-500 dark:text-orange-400 font-semibold'>
              {`${getMoneyPattern(group?.price)} so'm`}
            </span>
          </div>
          <div className='flex flex-col relative overflow-hidden gap-1 items-start justify-center h-[50%] bg-white dark:bg-neutral-700/40 rounded-3xl p-5 px-8'>
            <span className='text-[14px] text-center'>{"Dars xonasi"}</span>
            <span className='text-[24px] text-center text-purple-500 dark:text-purple-400 font-semibold'>
              {`${group?.room?.roomNumber}-xona`}
            </span>
            <FontAwesomeIcon
              icon={faDoorClosed}
              className='absolute right-5 bottom-0 text-[90px] text-neutral-300 dark:text-neutral-400/30'
            />
          </div>
        </div>
        <div className='flex flex-col items-center w-[300px] gap-2 bg-white/50 dark:bg-neutral-800/50 p-2 rounded-[30px]'>
          <span className='text-[14px] bg-white dark:bg-neutral-700/40 rounded-3xl p-2 px-5'>
            {"Dars vaqtlari"}
          </span>
          <div className='flex justify-center items-center w-full h-full bg-white dark:bg-neutral-700/40 rounded-3xl p-2 px-5'>
            <div className='flex flex-row flex-wrap font-space justify-center items-center text-[12px] gap-2 w-full'>
              {weekDays.map((day, index) => (
                <div
                  className={
                    !lessonTimes?.find((el) => el.day === index)
                      ? "flex justify-center items-center rounded-xl min-w-[35px] h-[35px] bg-neutral-200 dark:bg-neutral-600 px-2"
                      : "flex justify-center items-center rounded-xl min-w-[35px] h-[35px] bg-orange-500/10 dark:bg-orange-600 px-2 text-orange-600 dark:text-white"
                  }
                >
                  {lessonTimes?.find((el) => el.day === index)
                    ? `${getWeekDayAbb(index)} ${getHourMinuteFromTime(
                        lessonTimes?.find((el) => el.day === index)?.fromTime
                      )} - ${getHourMinuteFromTime(
                        lessonTimes?.find((el) => el.day === index)?.toTime
                      )}`
                    : day}
                </div>
              ))}
              {/* {lessonTimes &&
                getLessonTimesString(lessonTimes).map((item) => (
                  <div
                    key={v4()}
                    style={{
                      flexDirection: item.day.length > 6 ? "column" : "row",
                    }}
                    className='flex w-full items-center justify-center  gap-2'
                  >
                    {" "}
                    <span
                      style={{
                        fontSize:
                          item.day.length > 5
                            ? "14px"
                            : lessonTimes.length < 5
                            ? "18px"
                            : "14px",
                      }}
                      className='text-[18px] text-orange-500 rounded-full px-3 p-1 bg-neutral-100 dark:bg-neutral-700'
                    >
                      {item.day}
                    </span>
                    <span
                      style={{
                        fontSize: lessonTimes.length < 5 ? "21px" : "14px",
                      }}
                      className='font-semibold  dark:text-foresty-white/80'
                    >
                      {item.time}
                    </span>
                    <br />
                  </div>
                ))} */}
            </div>
          </div>
        </div>

        <div className='flex flex-col w-[200px] min-h-[250px] py-10 gap-3 bg-foresty-white dark:bg-forestydark-500 rounded-[30px] justify-between items-center'>
          <Avatar
            className='w-[80px] h-[80px]'
            css={{ border: "$white", width: "80px", height: "80px" }}
            src={getProfileAvatar(teacher?.teacher?.teacher?.profilePhoto)}
            isBordered
            color='success'
          />
          <span className='text-[14px] font-bold w-[80%] text-center px-2'>
            {`${teacher?.teacher?.teacher?.user?.lastName} ${teacher?.teacher?.teacher?.user?.firstName}`}
          </span>
          <Chip
            className='text-white'
            size='sm'
            color={getColorStatus(teacher?.teacher?.status)}
          >
            {sentenceCase(teacher?.teacher?.status)}
          </Chip>

          {/* <button
            onClick={() => navigate(`/teachers/${teacher?.teacher?.id}`)}
            className='text-[12px] font-semibold text-[#765cff] mt-2'
          >
            {" Profilni Ko'rish"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
