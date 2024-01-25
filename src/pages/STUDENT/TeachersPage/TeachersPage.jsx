import React, { useEffect } from "react";
import PageContainer from "../../../components/Container/PageContainer";
import PageHeader from "../../../components/Dashboard/PageHeader";
import PageBoard from "../../../components/Container/PageBoard";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "./teachersSlice";
import ForestyTable from "../../../components/Table/ForestyTable";
import { INITIAL_VISIBLE_COLUMNS, columns, searchIndexes } from "./data";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.steachers);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, []);
  return (
    <PageContainer>
      <PageHeader title="O'qituvchilar" count={teachers?.length} />
      <PageBoard>
        {teachers && (
          <ForestyTable
            searchIndexes={searchIndexes}
            tableData={teachers}
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

export default TeachersPage;
