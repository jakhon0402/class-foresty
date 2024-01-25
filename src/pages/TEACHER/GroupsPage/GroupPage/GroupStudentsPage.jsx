import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupStudents, removeStudentFromGroup } from "../groupsSlice";
import ForestyTable from "../../../../components/Table/ForestyTable";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "./data/studentsTable";

const GroupStudentsPage = ({ groupId }) => {
  const { students } = useSelector((state) => state.tgroups);

  const dispatch = useDispatch();

  useEffect(() => {
    groupId && dispatch(getGroupStudents(groupId));
  }, []);
  return (
    <div className='dark:bg-neutral-800/50 bg-white/80 p-3 rounded-[30px]'>
      {" "}
      {students && (
        <ForestyTable
          isStriped
          searchIndexes={searchIndexes}
          //   viewButton={(id) => (
          //     <NavigateViewButton isLight path={`/students/${id}`} />
          //   )}

          tableData={students}
          columns={columns}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          editButton={null}
          deleteButton={null}
        />
      )}
    </div>
  );
};

export default GroupStudentsPage;
