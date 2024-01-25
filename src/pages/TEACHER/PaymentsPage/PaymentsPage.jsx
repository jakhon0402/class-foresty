import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherPaymentGroups,
  getTeacherPaymentsByGroupId,
} from "./paymentsSlice";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ForestyTable from "../../../components/Table/ForestyTable";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "../GroupsPage/GroupPage/data/paymentsTable";
import { joinedDate } from "../../../utils/date";

const PaymentsPage = ({ user }) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const { paymentGroups, payments } = useSelector((state) => state.tpayments);
  const { theme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(getTeacherPaymentGroups({ id: user?.id }));
  }, []);

  useEffect(() => {
    paymentGroups &&
      paymentGroups.length !== 0 &&
      dispatch(
        getTeacherPaymentsByGroupId({
          id: paymentGroups.find((el, index) => index === selectedGroup)?.group
            ?.id,
        })
      );
  }, [selectedGroup, paymentGroups]);
  return (
    <div className='flex flex-col w-full gap-5'>
      <div className='flex relative w-full h-[120px]'>
        <div className='flex flex-row w-[100%] absolute flex-nowrap gap-3 bg-foresty-500/50 dark:bg-forestydark-800 rounded-[20px] p-[10px] overflow-scroll scrollbar-hide'>
          {paymentGroups &&
            paymentGroups.map((el, ind) => {
              return (
                <button
                  onClick={() => selectedGroup !== ind && setSelectedGroup(ind)}
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? selectedGroup === ind
                          ? "#2f2f2fcc"
                          : "#1f1f1f"
                        : selectedGroup === ind
                        ? "#fff"
                        : "#ffffffcc",
                    border:
                      el.status === "COMPLETED"
                        ? "1px solid #00a652"
                        : el.status === "UNCOMPLETED"
                        ? "1px solid #fc9500"
                        : null,
                  }}
                  key={el?.id}
                  className='flex flex-col flex-none relative gap-1 items-center justify-center px-8 py-5 w-[220px] h-[100px] rounded-[10px] '
                >
                  {el?.status == "COMPLETED" ? (
                    <span className='absolute top-[5px] right-[5px]'>
                      <CheckCircleIcon className='w-[20px] h-[20px] text-foresty-500' />
                    </span>
                  ) : el?.status == "UNCOMPLETED" ? (
                    <span className='absolute top-[5px] right-[5px]'>
                      <ExclamationCircleIcon className='w-[20px] h-[20px] text-forestyWarning' />
                    </span>
                  ) : null}
                  <span className='text-[12px] font-bold text-center dark:text-foresty-white'>
                    {el?.group?.name}
                  </span>
                  <span
                    style={{
                      color: el?.group[el?.group?.type]?.color?.lightHexCode,
                    }}
                    className='text-[12px] font-bold'
                  >
                    {el?.group[el?.group?.type]?.name}
                  </span>
                  <div className='flex flex-row text-[9px] gap-3'>
                    <span className='font-bold dark:text-foresty-white/80 text-forestydark-200'>
                      {`${joinedDate(el?.group?.created_at)}`}
                    </span>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {payments && paymentGroups && (
        <div className='bg-white p-5 rounded-3xl dark:bg-neutral-800/50'>
          <ForestyTable
            isStriped
            // dataLoading={paymentsLoading}

            searchIndexes={searchIndexes}
            //   viewButton={(id) => (
            //     <NavigateViewButton isLight path={`/students/${id}`} />
            //   )}

            tableData={payments}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            editButton={null}
            deleteButton={null}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
