export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "Oy", uid: "groupMonth.month", sortable: true },
  { name: "Sanadan", uid: "groupMonth.fromDate", sortable: true },
  { name: "Sanagacha", uid: "groupMonth.toDate", sortable: true },

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
  "groupMonth.month",
  "groupMonth.fromDate",
  "groupMonth.toDate",

  "status",

  "rowOrder",
  "paymentProgress",
  "paymentAmount",
  "paidAmount",
  "debtAmount",

  //   "created_at",
  "actions",
];

export const searchIndexes = [
  ["groupMonth", "month"],
  ["groupMonth", "fromDate"],
  ["groupMonth", "toDate"],
  "paymentProgress",
  "paymentAmount",
  "paidAmount",
  "debtAmount",
];
