import React, { useEffect } from "react";
import PageContainer from "../../../components/Container/PageContainer";
import PageHeader from "../../../components/Dashboard/PageHeader";
import PageBoard from "../../../components/Container/PageBoard";
import ForestyTable from "../../../components/Table/ForestyTable";
import { useDispatch, useSelector } from "react-redux";
import { INITIAL_VISIBLE_COLUMNS, columns, searchIndexes } from "./data/table";
import {
  NavigateCreateButton,
  NavigateViewButton,
} from "../../../components/Buttons/NavigateButtons";
import { getAllGroups } from "./groupsSlice";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.tgroups);

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return (
    <PageContainer>
      <PageHeader title='Guruhlar' count={groups?.length} />
      <PageBoard>
        {groups && (
          <ForestyTable
            isStriped={true}
            searchIndexes={searchIndexes}
            viewButton={(id, data) => (
              <NavigateViewButton
                isLight
                path={`/t/groups/${data?.group?.id}`}
              />
            )}
            tableData={groups}
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

export default GroupsPage;
