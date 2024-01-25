import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupStudentPaymentsByGroupId } from "../groupsSlice";
import ForestyTable from "../../../../components/Table/ForestyTable";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "../data/paymentsTable";

const GroupPaymentsPage = ({ groupId }) => {
  const dispatch = useDispatch();
  const { studentPayments, paymentsLoading } = useSelector(
    (state) => state.sgroups
  );

  useEffect(() => {
    groupId && dispatch(getGroupStudentPaymentsByGroupId(groupId));
  }, []);

  return (
    <div>
      {" "}
      {studentPayments && (
        <ForestyTable
          isStriped
          dataLoading={paymentsLoading}
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
      )}
    </div>
  );
};

export default GroupPaymentsPage;
