export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "Guruh nomi", uid: "group.name", sortable: true },
  { name: "ISMI", uid: "student.student.user.firstName", sortable: true },
  { name: "FAMILIYA", uid: "student.student.user.lastName", sortable: true },
  {
    name: "OTASINING ISMI",
    uid: "student.student.user.fatherName",
    sortable: true,
  },
  {
    name: "OTASINING ISMI",
    uid: "student.student.user.username",
    sortable: true,
  },
  { name: "STATUS", uid: "status", sortable: true },

  {
    name: "TEL. RAQAM",
    uid: "student.student.user.phoneNumber",
    sortable: true,
  },
  {
    name: "OTASI/ONASI TEL. RAQAM",
    uid: "student.parentPhoneNumber",
    sortable: true,
  },
  {
    name: "OTASI/ONASI TEL. RAQAM 2",
    uid: "student.secondaryParentPhoneNumber",
    sortable: true,
  },

  { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "group.name",
  "status",
  "rowOrder",
  "student.student.user.firstName",
  "student.student.user.lastName",
  "student.student.user.fatherName",
  "student.student.user.phoneNumber",
  "student.student.user.username",
  "student.parentPhoneNumber",
  // "secondaryParentPhoneNumber",
  "created_at",
  // "actions",
];

export const searchIndexes = [
  "student.user.firstName",
  "student.user.lastName",
  "student.user.fatherName",
  "student.user.phoneNumber",
  "student.user.username",
  "student.parentPhoneNumber",
  "student.secondaryParentPhoneNumber",
];

export const searchIndexesStudentsModal = [
  "student.user.firstName",
  "student.user.lastName",
  "student.user.fatherName",
  "student.user.username",
  "student.user.phoneNumber",
  "student.parentPhoneNumber",
  "student.secondaryParentPhoneNumber",
];
