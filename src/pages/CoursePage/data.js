import * as Yup from "yup";

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Kurs nomi",
    placeholder: "Kurs nomi kiriting...",
    isRequired: true,
  },
  {
    name: "colorName",
    type: "select",
    label: "Rang",
    placeholder: "Rangni tanlang...",
    isRequired: true,
  },
  {
    name: "duration",
    type: "number",
    label: "Kurs davomiyligi",
    placeholder: "Kurs davomiyligini kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  name: "",
  colorName: "",
  duration: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  colorName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  duration: Yup.number().required("Bo'sh bo'lmasligi kerak!"),
});

export const columns = [
  { name: "ID", uid: "rowOrder", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },
  { name: "DAVOMIYLIGI", uid: "duration", sortable: true },
  { name: "RANGI", uid: "color" },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "rowOrder",
  "name",
  "color",
  "duration",
  // "created_at",
  // "actions",
];

export const colors = [
  {
    id: "Maroon",
    name: "Maroon",
    hexCode: "#800000",
    lightHexCode: "#b36666",
    rgbCode: "rgb(128,0,0)",
  },
  {
    id: "Orange",
    name: "Orange",
    hexCode: "#ff7400",
    lightHexCode: "#ffac66",
    rgbCode: "rgb(255,116,0)",
  },
  {
    id: "Amber",
    name: "Amber",
    hexCode: "#febd00",
    lightHexCode: "#fed766",
    rgbCode: "rgb(254,189,0)",
  },
  {
    id: "Ocean blue",
    name: "Ocean blue",
    hexCode: "#2645e0",
    lightHexCode: "#67ade7",
    rgbCode: "rgb(38,69,224)",
  },
  {
    id: "Forest",
    name: "Forest",
    hexCode: "#228b22",
    lightHexCode: "#66ca97",
    rgbCode: "rgb(34,139,34)",
  },
  {
    id: "Lavender",
    name: "Lavender",
    hexCode: "#9e73c7",
    lightHexCode: "#c5abdd",
    rgbCode: "rgb(158,115,199)",
  },
  {
    id: "Walnut",
    name: "Walnut",
    hexCode: "#6f432a",
    lightHexCode: "#a98e7f",
    rgbCode: "rgb(111,67,42)",
  },
  {
    id: "Midnight",
    name: "Midnight",
    hexCode: "#1c1d54",
    lightHexCode: "#7d7ba6",
    rgbCode: "rgb(28,29,84)",
  },
];

export const searchIndexes = ["name"];
