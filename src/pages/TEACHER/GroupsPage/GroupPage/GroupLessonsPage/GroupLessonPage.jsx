import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptGroupLessonAtts,
  createGroupLessonAtts,
  createGroupLessonData,
  getGroupLessonAtts,
  getGroupLessonData,
  updateGroupLessonData,
} from "../../groupsSlice";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CreateEditModal from "../../../../../components/Modal/CreateEditModal";
import { emptyValues, fields, validationSchema } from "./data";
import ForestyForm from "../../../../../components/Form/ForestyForm";
import { dateString } from "../../../../../utils/date";
import { EditButton } from "../../../../../components/Buttons/CRUDbuttons";
import AttendanceTable from "../../../../../components/Table/AttendanceTable/AttendanceTable";
import { INITIAL_VISIBLE_COLUMNS, columns, searchIndexes } from "./attsTable";
import ForestyTable from "../../../../../components/Table/ForestyTable";
import DeleteModal from "../../../../../components/Modal/DeleteModal";

const GroupLessonPage = ({ lesson, setIsCalendar }) => {
  const { lessonData, lessonAtts } = useSelector((state) => state.tgroups);

  const dispatch = useDispatch();

  useEffect(() => {
    lesson && dispatch(getGroupLessonData(lesson?.id));
    lesson && dispatch(getGroupLessonAtts(lesson?.id));
  }, []);
  return (
    <div className='flex flex-col w-full p-5'>
      <div className='flex flex-row justify-between'>
        <Breadcrumbs
          variant='solid'
          size='lg'
          color='warning'
          classNames={{
            list: "dark:bg-amber-500/20 bg-amber-500/10",
          }}
        >
          <BreadcrumbItem onPress={() => setIsCalendar(true)}>
            Kalendar
          </BreadcrumbItem>
          {lesson && (
            <BreadcrumbItem>
              {dateString(new Date(lesson?.date))}
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
        {lessonData && (
          <div className='flex flex-row gap-3 pr-5 items-center'>
            <span className='text-[16px] text-neutral-400'>{`Mavzu:`}</span>
            <span className='text-[16px]'>{`${lessonData?.theme}`}</span>
            <CreateEditModal
              button={<EditButton />}
              title={"Tahrirlash"}
              //   loading={loading}
              btnText={"Tahrirlash"}
              fields={fields}
              initialValues={{
                ...lessonData,
              }}
              validationSchema={validationSchema}
              submitBtnText={"Tahrirlash"}
              handleSubmit={(body) =>
                dispatch(updateGroupLessonData({ id: lesson?.id, data: body }))
              }
            />
          </div>
        )}
      </div>
      <div className='flex flex-col w-full p-5 items-center'>
        {lessonData ? (
          <div className='flex flex-col w-full items-center'>
            {lessonAtts && lessonAtts.length > 0 ? (
              <ForestyTable
                searchIndexes={searchIndexes}
                isSelection={lesson?.status === "HELD" ? false : true}
                columns={columns}
                tableData={lessonAtts.map((el) => ({ ...el, key: el?.id }))}
                initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                selectionSubmitButton={(keys) => (
                  <DeleteModal
                    button={
                      <Button color='secondary'>
                        {"Davomatni tasdiqlash"}
                      </Button>
                    }
                    warningText={
                      "Davomat tasdiqlangan so'ng uni qayta o'zgartirib bo'lmaydi. Ma'lumotlar to'g'riligiga aminmisiz?"
                    }
                    title='Davomatni tasdiqlash'
                    submitText='Tasdiqlash'
                    handleSubmit={() => {
                      dispatch(
                        acceptGroupLessonAtts({
                          id: lesson?.id,
                          data: { ids: keys },
                        })
                      );
                    }}
                  />
                )}
              />
            ) : (
              <Button
                onPress={() =>
                  dispatch(createGroupLessonAtts({ id: lesson?.id }))
                }
                color='secondary'
                className='w-fit'
              >
                {"Davomat ma'lumotlarini shakllantirish"}
              </Button>
            )}
          </div>
        ) : (
          <CreateEditModal
            button={
              <Button color='secondary' className='w-fit'>
                {"Dars ma'lumotlarini shakllantirish"}
              </Button>
            }
            title={"Dars ma'lumotlarini shakllantirish"}
            //   loading={loading}
            btnText={"Shakllantirish"}
            fields={fields}
            initialValues={emptyValues}
            validationSchema={validationSchema}
            submitBtnText={"Shakllantirish"}
            handleSubmit={(body) =>
              dispatch(createGroupLessonData({ id: lesson?.id, data: body }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default GroupLessonPage;
