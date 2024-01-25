export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "OYLIK NARXI", uid: "price", sortable: true },

  // { name: "DARS VAQTLARI", uid: "lessonTimes" },
  // { name: "DARS BOSHLANISH SANASI", uid: "startDate", sortable: true },

  { name: "XONA", uid: "room", sortable: true },

  { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "status",
  "rowOrder",
  "agreement",
  // "lessonTimes",
  "name",
  "room",
  "price",
  // "startDate",
  "created_at",
  "actions",
];

export const searchIndexes = ["name"];
