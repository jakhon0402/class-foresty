import React, { useEffect } from "react";
import PageContainer from "../../components/Container/PageContainer";
import PageHeader from "../../components/Dashboard/PageHeader";
import PageBoard from "../../components/Container/PageBoard";
import ForestyTable from "../../components/Table/ForestyTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "./subjectsSlice";
import { INITIAL_VISIBLE_COLUMNS, columns, searchIndexes } from "./data";

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subjects);

  useEffect(() => {
    !subjects && dispatch(getAllSubjects());
  }, []);
  return (
    <PageContainer>
      <PageHeader title='Fanlar' count={subjects?.length} />
      <PageBoard>
        {subjects && (
          <ForestyTable
            isStriped
            searchIndexes={searchIndexes}
            tableData={subjects}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          />
        )}
      </PageBoard>
    </PageContainer>
  );
};

export default SubjectsPage;
