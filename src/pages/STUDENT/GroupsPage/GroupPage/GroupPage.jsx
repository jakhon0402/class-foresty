import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroup } from "../groupsSlice";
import { Badge, Spinner, Tab, Tabs } from "@nextui-org/react";
import { getColorStatus } from "../../../../utils/status";
import { tabs } from "../data/group";
import DetailsPage from "./DetailsPage";
import GroupMonthsPage from "./GroupMonthsPage";
import GroupPaymentsPage from "./GroupPaymentsPage";

const GroupPage = () => {
  const { id } = useParams();
  const [selected, setSelected] = React.useState(
    localStorage.getItem("group-menu") ?? "details"
  );

  const dispatch = useDispatch();
  const { group, loading } = useSelector((state) => state.sgroups);

  useEffect(() => {
    dispatch(getGroup(id));
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className='flex flex-col w-full items-center gap-5'>
      <div className='grid grid-cols-3 w-full'>
        <div className='w-fit'>
          <Badge
            content={group?.status}
            color={getColorStatus(group?.status)}
            className='text-white text-[12px]'
          >
            <div className='bg-white dark:bg-neutral-800 rounded-full px-5 py-2'>
              <span>{group?.name}</span>
            </div>
          </Badge>
        </div>
        <div className='w-full flex justify-center items-center'>
          <Tabs
            selectedKey={selected}
            onSelectionChange={(key) => {
              localStorage.setItem("group-menu", key);
              setSelected(key);
            }}
            size='md'
            radius='full'
            aria-label='Tabs sizes'
          >
            {tabs.map((tab) => (
              <Tab title={tab.title} key={tab.key} />
            ))}
          </Tabs>
        </div>
      </div>
      <div className='bg-white/30 dark:bg-neutral-900 rounded-3xl p-8 w-full'>
        {selected === "details" ? (
          <DetailsPage group={group} />
        ) : selected === "lessonTimes" ? (
          <GroupMonthsPage groupId={group?.id} />
        ) : selected === "payments" ? (
          <GroupPaymentsPage groupId={group?.id} />
        ) : // selected === "students" ? (
        //   <GroupStudentsPage groupId={group?.id} />
        // ) : selected === "lessonTimes" ? (
        //   <GroupMonthsPage groupId={group?.id} />
        // ) : selected === "payments" ? (
        //   <GroupTeacherPayments groupId={group?.id} />
        // ) : selected === "studentPayments" ? (
        //   <GroupPaymentsPage groupId={group?.id} />
        // ) :
        null}
      </div>
    </div>
  );
};

export default GroupPage;
