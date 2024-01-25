import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherPaymentsByGroupId } from "../groupsSlice";

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  searchIndexes,
} from "./data/paymentsTable";
import ForestyTable from "../../../../components/Table/ForestyTable";

const GroupTeacherPayments = ({ groupId }) => {
  const { teacherPayments } = useSelector((state) => state.tgroups);

  const dispatch = useDispatch();

  useEffect(() => {
    groupId && dispatch(getTeacherPaymentsByGroupId({ id: groupId }));
  }, []);

  return (
    <div>
      {teacherPayments && (
        <div className='bg-white p-5 rounded-3xl dark:bg-neutral-800/50'>
          <ForestyTable
            isStriped
            // dataLoading={paymentsLoading}

            searchIndexes={searchIndexes}
            //   viewButton={(id) => (
            //     <NavigateViewButton isLight path={`/students/${id}`} />
            //   )}

            tableData={teacherPayments}
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

export default GroupTeacherPayments;
