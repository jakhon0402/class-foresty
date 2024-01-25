export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  {
    name: "Familiya",
    uid: "groupStudent.student.student.user.lastName",
    sortable: true,
  },
  {
    name: "Ism",
    uid: "groupStudent.student.student.user.firstName",
    sortable: true,
  },
  {
    name: "Otasining ismi",
    uid: "groupStudent.student.student.user.fatherName",
    sortable: true,
  },
  { name: "Status", uid: "groupStudent.status", sortable: true },
  { name: "Darsga qatnashgan", uid: "isAbsent", sortable: true },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "rowOrder",
  "groupStudent.student.student.user.lastName",
  "groupStudent.student.student.user.firstName",
  "groupStudent.student.student.user.fatherName",
  "groupStudent.status",
  "color",
  "isAbsent",
  // "created_at",
  // "actions",
];

export const searchIndexes = [
  ["groupStudent", "student", "student", "user", "lastName"],
  ["groupStudent", "student", "student", "user", "firstName"],
  ["groupStudent", "student", "student", "user", "fatherName"],
];
