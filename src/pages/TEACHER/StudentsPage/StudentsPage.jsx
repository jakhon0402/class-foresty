import React, { useEffect } from "react";
import PageContainer from "../../../components/Container/PageContainer";
import PageHeader from "../../../components/Dashboard/PageHeader";
import PageBoard from "../../../components/Container/PageBoard";
import ForestyTable from "../../../components/Table/ForestyTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "./studentsSlice";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "./data/studentsTable";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.tstudents);

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);
  return (
    <PageContainer>
      <PageHeader title="O'quvchilar" count={students?.length} />
      <PageBoard>
        {students && (
          <ForestyTable
            isStriped={true}
            searchIndexes={searchIndexes}
            tableData={students}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
            editButton={null}
            deleteButton={null}
          />
        )}
      </PageBoard>
    </PageContainer>
  );
};

export default StudentsPage;
