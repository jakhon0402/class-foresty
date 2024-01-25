export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },

  { name: "SANASI", uid: "created_at", sortable: true },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "rowOrder",
  "name",

  "created_at",
  "actions",
];

export const searchIndexes = ["name"];
