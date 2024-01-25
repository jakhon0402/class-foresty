export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "NOMI", uid: "group.name", sortable: true },
  { name: "STATUS", uid: "group.status", sortable: true },
  { name: "OYLIK NARXI", uid: "group.price", sortable: true },
  { name: "Kelishuv", uid: "agreement", sortable: true },
  // { name: "DARS VAQTLARI", uid: "lessonTimes" },
  // { name: "DARS BOSHLANISH SANASI", uid: "startDate", sortable: true },

  { name: "XONA", uid: "group.room.roomNumber", sortable: true },

  { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "group.status",
  "rowOrder",
  "agreement",
  // "lessonTimes",
  "group.name",
  "group.room.roomNumber",
  "group.price",
  // "startDate",
  "created_at",
  "actions",
];

export const searchIndexes = [["group", "name"]];
