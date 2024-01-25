import * as Yup from "yup";

export const newGroupFields = [
  {
    name: "name",
    type: "text",
    label: "Guruh nomi",
    placeholder: "Guruh nomini kiriting...",
    isRequired: true,
  },
  {
    name: "teacherId",
    type: "select",
    label: "O'qituvchi",
    placeholder: "O'qituvchini tanlang...",
    isRequired: true,
  },
  {
    name: "agreement",
    type: "number",
    label: "Kelishuv",
    placeholder: "Kelishuvni kiriting...",
    isRequired: true,
  },
  {
    name: "price",
    type: "text",
    label: "Oylik narxi",
    placeholder: "Guruhni oylik narxini kiriting...",
    isRequired: true,
  },

  {
    name: "roomId",
    type: "select",
    label: "Xona",
    placeholder: "Xonani tanlang...",
    isRequired: true,
  },

  {
    name: "testDaysCount",
    type: "number",
    label: "Sinov muddati",
    placeholder: "Sinov muddatini kiriting...",
    isRequired: true,
  },
];

export const subjectBasedFieldsNew = [
  ...newGroupFields,
  {
    name: "subjectId",
    type: "select",
    label: "Fan",
    placeholder: "Fanni tanlang...",
    isRequired: true,
  },
];

export const courseBasedFieldsNew = [
  ...newGroupFields,
  {
    name: "courseId",
    type: "select",
    label: "Kurs",
    placeholder: "Kursni tanlang...",
    isRequired: true,
  },
];

export const activeGroupFields = [
  {
    name: "name",
    type: "text",
    label: "Guruh nomi",
    placeholder: "Guruh nomini kiriting...",
    isRequired: true,
  },
  {
    name: "agreement",
    type: "number",
    label: "Kelishuv",
    placeholder: "Kelishuvni kiriting...",
    isRequired: true,
  },
  {
    name: "price",
    type: "text",
    label: "Oylik narxi",
    placeholder: "Guruhni oylik narxini kiriting...",
    isRequired: true,
  },

  {
    name: "roomId",
    type: "select",
    label: "Xona",
    placeholder: "Xonani tanlang...",
    isRequired: true,
  },
];

export const activeValidationSchema = Yup.object().shape({
  name: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  roomId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  agreement: Yup.number()
    .min(1, "Kelishuv noto'g'ri kiritildi!")
    .max(100, "Kelishuv noto'g'ri kiritildi!")
    .required("Bo'sh bo'lmasligi kerak!"),
  price: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
});
