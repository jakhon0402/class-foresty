import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDocument,
  downloadDocument,
  getAllDocuments,
  uploadDocument,
} from "../Documents/documentSlice";
import ForestyTable from "../../components/Table/ForestyTable";
import {
  INITIAL_VISIBLE_COLUMNS,
  columns,
  searchIndexes,
} from "../Documents/documentsTable";
import CreateEditModal from "../../components/Modal/CreateEditModal";
import {
  emptyValues,
  fields,
  validationSchema,
} from "../Documents/documentForm";
import { DownloadFileButton } from "../../components/Buttons/TableButtons";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DeleteButton } from "../../components/Buttons/CRUDbuttons";

const ProfileDocumentPage = ({ user }) => {
  const { documents } = useSelector((state) => state.documents);

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(getAllDocuments(user?.id));
  }, []);
  return (
    <div className='dark:bg-neutral-800/50 bg-white/80 p-3 rounded-[30px]'>
      {" "}
      {documents && (
        <ForestyTable
          isStriped
          //   extraButton={(student) => (
          //     <RemoveStudentFromGroupModal
          //       handleSubmit={(onClose) =>
          //         dispatch(removeStudentFromGroup({ id: student?.id, onClose }))
          //       }
          //       contextText={`${student["student.user.lastName"]} ${student["student.user.firstName"]} ${student["student.user.fatherName"]}`}
          //       button={
          //         <LeaveButton disabled={student.status === "LEAVED"} isLight />
          //       }
          //     />
          //   )}
          searchIndexes={searchIndexes}
          //   viewButton={(id) => (
          //     <NavigateViewButton isLight path={`/students/${id}`} />
          //   )}
          createModal={
            <CreateEditModal
              title={"Hujjat qo'shish"}
              //   loading={loading}
              btnText={"Hujjat qo'shish"}
              fields={fields}
              initialValues={emptyValues}
              validationSchema={validationSchema}
              submitBtnText={"Qo'shish"}
              handleSubmit={(body) =>
                dispatch(
                  uploadDocument({
                    userId: user.id,
                    documentName: body?.name,
                    documentFile: body?.documentFile,
                  })
                )
              }
            />
          }
          tableData={documents}
          columns={columns}
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
          editButton={null}
          extraButton={(data) => (
            <DownloadFileButton
              onClick={() =>
                downloadDocument({
                  id: data?.id,
                  fileName: data?.attachment?.originalName,
                })
              }
            />
          )}
          deleteButton={(data) => (
            <DeleteModal
              button={<DeleteButton isLight />}
              contextText={`${data.name} hujjatni`}
              handleSubmit={() => dispatch(deleteDocument({ id: data.id }))}
            />
          )}
        />
      )}
    </div>
  );
};

export default ProfileDocumentPage;
