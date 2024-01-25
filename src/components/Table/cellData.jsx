import { Avatar, Chip, CircularProgress } from "@nextui-org/react";
import React from "react";
import date from "date-and-time";
import { useTheme } from "next-themes";
import { getMoneyPattern, getPhoneNumberPattern } from "../../utils/regex";
import { getColorStatus } from "../../utils/status";
import { getLessonTimesString } from "../../utils/lessonTime";
import { v4 } from "uuid";
import { getProfileAvatar } from "../../utils/profile";

export const useRenderCell = (
  data,
  columnKey,
  viewButton,
  editButton,
  deleteButton,
  extraButton,
  theme
) => {
  let cellValue = data[columnKey];
  if (columnKey.includes(".")) {
    let arr = columnKey.split(".");

    cellValue = data;
    arr.forEach((el) => {
      cellValue = cellValue[el];
    });
  }

  switch (columnKey) {
    case "rowOrder":
      return <span className='font-bold text-[14px]'>{cellValue}</span>;
    case "name":
      return (
        <span className='font-bold text-[14px]'>{cellValue}</span>
        //   <User
        //     avatarProps={{ radius: "lg", src: user.avatar }}
        //     description={user.email}
        //     name={cellValue}
        //   >
        //     {user.email}
        //   </User>
      );
    case "fullName":
      let firstName =
        data[Object.keys(data).find((el) => el.includes("firstName"))];
      let lastName =
        data[Object.keys(data).find((el) => el.includes("lastName"))];
      let fatherName =
        data[Object.keys(data).find((el) => el.includes("fatherName"))];
      return (
        <span className='font-normal text-[13px]'>{`${lastName} ${firstName} ${fatherName}`}</span>
      );
    case "role":
      return (
        <div className='flex flex-col'>
          <p className='text-bold text-small capitalize'>{cellValue}</p>
          <p className='text-bold text-tiny capitalize text-default-400'>
            {data.team}
          </p>
        </div>
      );

    case "teacher.profilePhoto":
      return (
        <Avatar
          classNames={{ fallback: "border-[1px]" }}
          className='w-[40px] h-[40px]'
          size='lg'
          src={getProfileAvatar(cellValue)}
          // src={teacher?.teacher??.avatar == null ? defaultImage : defaultImage}
          // isBordered
          color='success'
        />
      );

    case "attachment.id":
      return (
        <div className='flex flex-col'>
          <img
            className='w-[80px]'
            src={`http://localhost:8084/api/fayl/download/${data?.fileEntity?.id}`}
          />
        </div>
      );

    case "paymentType":
      return (
        <Chip
          size='sm'
          className={
            cellValue === "CARD"
              ? "bg-purple-500 text-white"
              : "bg-green-600 text-white"
          }
        >
          {cellValue === "CARD" ? "Karta orqali" : "Naqd pul"}
        </Chip>
      );

    case "price":
    case "group.price":
    case "paymentAmount":
    case "paidAmount":
    case "debtAmount":
      return (
        <div className='flex flex-col font-space'>
          <span
            style={{
              opacity:
                columnKey == "debtAmount" && data.status === "PAID" ? 0.5 : 1,
            }}
            className={
              columnKey === "paidAmount"
                ? "font-semibold text-green-500"
                : columnKey === "debtAmount"
                ? "font-semibold text-red-500"
                : "font-semibold"
            }
          >{`${
            cellValue || cellValue == 0 ? getMoneyPattern(cellValue) : ""
          } so'm`}</span>
        </div>
      );

    case "amount":
      return (
        <div className='flex flex-col font-space'>
          <span
            className={
              data?.type
                ? data?.type === "INCOME"
                  ? "font-semibold text-green-500"
                  : data?.type === "EXPENSE"
                  ? "font-semibold text-red-500"
                  : "font-semibold"
                : "font-semibold"
            }
          >{`${data?.type ? (data?.type === "INCOME" ? "+" : "-") : ""} ${
            cellValue || cellValue == 0 ? getMoneyPattern(cellValue) : ""
          } so'm`}</span>
        </div>
      );

    //   case "currentSalary":
    //     return (
    //       <div className='flex flex-col'>
    //         <span className='font-bold'>{`${
    //           cellValue ? getMoneyPattern(cellValue) : ""
    //         } so'm`}</span>
    //       </div>
    //     );
    case "created_at": {
      return (
        <div className='flex flex-col items-center w-fit'>
          <p className='text-bold capitalize text-[12px]'>
            {date.format(new Date(cellValue), "ddd, MMM DD YYYY")}
          </p>
          <p className='text-bold text-[14px] capitalize text-orange-500'>
            {date.format(new Date(cellValue), "HH:mm")}
          </p>
        </div>
      );
    }

    case "groupPaymentMonth.groupMonth.fromDate":
    case "groupPaymentMonth.groupMonth.toDate":
    case "groupMonth.toDate":
    case "groupMonth.fromDate":
    case "toDate":
    case "fromDate": {
      return (
        <div className='flex flex-col items-center w-fit'>
          <p className='text-bold capitalize text-[12px]'>
            {date.format(new Date(cellValue), "ddd, MMM DD YYYY")}
          </p>
        </div>
      );
    }

    case "isAbsent":
      return (
        <div>
          <span className=''>{cellValue ? "❌" : "✅"}</span>
        </div>
      );

    case "groupStudent.status":
    case "group.status":
    case "status":
    case "studentStatus":
      return (
        <Chip size='sm' variant='flat' color={getColorStatus(cellValue)}>
          {cellValue}
        </Chip>
      );

    // case "studentStatus":
    //   return (
    //     <Chip
    //       size='sm'
    //       variant='dot'
    //       className='border-green-500 border-[1px] py-2 text-green-500 bg-green-500/10'
    //       color={getColorStatus(cellValue)}
    //     >
    //       {cellValue}
    //     </Chip>
    //   );
    case "group.room.roomNumber":
      return <span>{`${cellValue}-xona`}</span>;
    case "room":
      return <span>{`${data?.room?.roomNumber}-xona`}</span>;
    case "color":
      return (
        <div className='flex flex-row items-center gap-2'>
          <span
            style={{
              backgroundColor: cellValue?.hexCode,
            }}
            className='w-[13px] h-[13px] rounded-full'
          ></span>
          <Chip
            // className='capitalize border-none gap-1 bg-red-500 text-green-500'
            size='sm'
            style={{
              backgroundColor:
                theme == "dark"
                  ? cellValue?.hexCode
                  : cellValue?.lightHexCode + "40",
              color: theme == "dark" ? "#fff" : cellValue?.hexCode,
            }}
            // variant='dot'
          >
            {cellValue?.colorName}
          </Chip>
        </div>
      );

    case "group.subjectOrCourse":
      return (
        <Chip
          className='text-[12px]'
          // className='capitalize border-none gap-1 bg-red-500 text-green-500'
          size='sm'
          style={{
            backgroundColor: data?.group[data?.group?.type]?.color?.hexCode,
            color: "#fff",
          }}
          // variant='dot'
        >
          {data?.group[data?.group?.type]?.name}
        </Chip>
      );

    case "subjects":
      return (
        <div className='flex flex-row bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl flex-wrap items-center justify-center gap-2 w-fit max-w-[150px]'>
          {cellValue?.map((sub) => (
            <Chip
              className='text-[12px]'
              // className='capitalize border-none gap-1 bg-red-500 text-green-500'
              size='sm'
              style={{
                backgroundColor: sub?.color?.hexCode,
                color: "#fff",
              }}
              // variant='dot'
            >
              {sub?.name}
            </Chip>
          ))}
        </div>
      );
    case "student.student.user.phoneNumber":
    case "student.user.phoneNumber":
    case "student.parentPhoneNumber":
    case "student.studentPhoneNumber":
    case "parentPhoneNumber":
    case "studentPhoneNumber":
    case "secondaryParentPhoneNumber":
    case "teacher.user.phoneNumber": {
      return <span>{getPhoneNumberPattern(cellValue)}</span>;
    }

    case "lessonTimes":
      return (
        <div className='flex flex-col text-[12px]'>
          {cellValue &&
            getLessonTimesString(cellValue).map((item) => (
              <div key={v4()} className='flex flex-row gap-2'>
                {" "}
                <span className=' text-orange-500'>{item.day}</span>
                <span className='font-semibold dark:text-foresty-white/80 text-[12px]'>
                  {item.time}
                </span>
                <br />
              </div>
            ))}
        </div>
      );

    case "agreement":
      return (
        <CircularProgress
          size='lg'
          value={cellValue}
          // color={(() => {
          //   let prog = cellValue;
          //   return prog < 30 ? "danger" : prog < 60 ? "warning" : "success";
          // })()}
          // formatOptions={{ style: "unit", unit: "kilometer" }}
          showValueLabel={true}
        />
      );
    case "paymentProgress":
      return (
        <CircularProgress
          size='lg'
          value={(data.paidAmount / data.paymentAmount) * 100}
          color={(() => {
            let prog = (data.paidAmount / data.paymentAmount) * 100;
            return prog < 30 ? "danger" : prog < 60 ? "warning" : "success";
          })()}
          // formatOptions={{ style: "unit", unit: "kilometer" }}
          showValueLabel={true}
        />
      );

    case "actions": {
      if ("category" in data) {
        data = {
          ...data,
          categoryId: data.category ? data.category.id + "" : null,
        };
      }

      return (
        <div className='relative flex items-center gap-5'>
          {viewButton && viewButton(data?.id, data)}
          {editButton && editButton(data)}
          {deleteButton && deleteButton(data)}
          {extraButton && extraButton(data)}
        </div>
      );
    }
    default:
      // if (columnKey.includes(".")) {
      //   const arr = columnKey.split(".");
      //   let val = data;
      //   arr.forEach((ck) => {
      //     val = val[ck];
      //   });

      //   return val;
      // }
      return cellValue;
  }
};
