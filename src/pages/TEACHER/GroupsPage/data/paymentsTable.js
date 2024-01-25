export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "F.I.Sh", uid: "studentFullName", sortable: true },
  { name: "STATUS", uid: "studentStatus", sortable: true },

  { name: "Tel. raqami", uid: "studentPhoneNumber", sortable: true },

  { name: "To'lov holati", uid: "status", sortable: true },
  { name: "To'lov qiymati", uid: "paymentAmount", sortable: true },
  { name: "Progress", uid: "paymentProgress", sortable: true },

  { name: "To'langan summa", uid: "paidAmount", sortable: true },
  { name: "Qarzdorlik", uid: "debtAmount", sortable: true },

  //   { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "studentFullName",
  "studentPhoneNumber",
  "status",
  "studentStatus",
  "rowOrder",
  "paymentProgress",
  "paymentAmount",
  "paidAmount",
  "debtAmount",

  //   "created_at",
  "actions",
];

export const searchIndexes = [
  "studentFullName",
  "studentPhoneNumber",
  "paymentProgress",
  "paymentAmount",
  "paidAmount",
  "debtAmount",
];
