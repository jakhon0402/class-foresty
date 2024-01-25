import * as Yup from "yup";

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Hujjat nomi",
    placeholder: "Hujjat nomi kiriting...",
    isRequired: true,
  },
  {
    name: "documentFile",
    type: "documentFile",
    isRequired: true,
  },
];

export const emptyValues = {
  name: "",
  documentFile: null,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
  documentFile: Yup.mixed().required("A file is required"),
});
