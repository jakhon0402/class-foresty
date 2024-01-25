export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "Avatar", uid: "teacher.profilePhoto", sortable: true },

  { name: "ISMI", uid: "teacher.user.firstName", sortable: true },
  { name: "FAMILIYA", uid: "teacher.user.lastName", sortable: true },
  { name: "OTASINING ISMI", uid: "teacher.user.fatherName", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },

  { name: "TEL. RAQAM", uid: "teacher.user.phoneNumber", sortable: true },
  { name: "FANLAR", uid: "subjects" },
  { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  // { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "status",
  "teacher.profilePhoto",
  "rowOrder",
  "teacher.user.firstName",
  "teacher.user.lastName",
  "teacher.user.fatherName",
  "teacher.user.phoneNumber",
  "subjects",
  "created_at",
  // "actions",
];

export const searchIndexes = [
  ["teacher", "user", "firstName"],
  ["teacher", "user", "lastName"],
  ["teacher", "user", "fatherName"],
  ["teacher", "user", "phoneNumber"],
];
