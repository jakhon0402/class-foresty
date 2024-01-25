import * as Yup from "yup";

export const fields = [
  {
    name: "theme",
    type: "text",
    label: "Mavzu nomi",
    placeholder: "Mavzu nomi kiriting...",
    isRequired: true,
  },
];

export const emptyValues = {
  theme: "",
};

export const validationSchema = Yup.object().shape({
  theme: Yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
});
