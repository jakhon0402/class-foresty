import React, { useEffect } from "react";
import PageContainer from "../../components/Container/PageContainer";
import PageHeader from "../../components/Dashboard/PageHeader";
import PageBoard from "../../components/Container/PageBoard";
import ForestyTable from "../../components/Table/ForestyTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "./coursesSlice";
import { INITIAL_VISIBLE_COLUMNS, columns, searchIndexes } from "./data";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    !courses && dispatch(getAllCourses());
  }, []);
  return (
    <PageContainer>
      <PageHeader title='Kurslar' count={courses?.length} />
      <PageBoard>
        {courses && (
          <ForestyTable
            isStriped
            searchIndexes={searchIndexes}
            tableData={courses}
            columns={columns}
            initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          />
        )}
      </PageBoard>
    </PageContainer>
  );
};

export default CoursesPage;
