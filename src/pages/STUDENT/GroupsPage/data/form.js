import * as Yup from "yup";

const fields = [
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
    name: "startsDate",
    type: "date",
    label: "Guruhning dars boshlanish sanasi",
    placeholder: "Dars boshlanish sanasini kiriting...",
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

export const subjectBasedFields = [
  ...fields,
  {
    name: "subjectId",
    type: "select",
    label: "Fan",
    placeholder: "Fanni tanlang...",
    isRequired: true,
  },
];

export const courseBasedFields = [
  ...fields,
  {
    name: "courseId",
    type: "select",
    label: "Kurs",
    placeholder: "Kursni tanlang...",
    isRequired: true,
  },
];

export const emptyValues = {
  name: "",
  teacherId: "",
  roomId: "",
  agreement: "",
  price: "",
  startsDate: "",
  testDaysCount: "",
};

export const subjectBasedValues = {
  ...emptyValues,
  subjectId: "",
};

export const courseBasedValues = {
  ...emptyValues,
  coursetId: "",
};

export const validationSchemaSubject = Yup.object().shape({
  name: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  teacherId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  subjectId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  roomId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  agreement: Yup.number()
    .min(1, "Kelishuv noto'g'ri kiritildi!")
    .max(100, "Kelishuv noto'g'ri kiritildi!")
    .required("Bo'sh bo'lmasligi kerak!"),
  price: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  startsDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  testDaysCount: Yup.number()
    .min(0, "Sinov muddati noto'g'ri kiritildi!")
    .max(30, "Sinov muddati noto'g'ri kiritildi!")
    .required("Bo'sh bo'lmasligi kerak!"),
});

export const validationSchemaCourse = Yup.object().shape({
  name: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  teacherId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  courseId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  roomId: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  agreement: Yup.number()
    .min(1, "Kelishuv noto'g'ri kiritildi!")
    .max(100, "Kelishuv noto'g'ri kiritildi!")
    .required("Bo'sh bo'lmasligi kerak!"),
  price: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  startsDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  testDaysCount: Yup.number()
    .min(0, "Sinov muddati noto'g'ri kiritildi!")
    .max(30, "Sinov muddati noto'g'ri kiritildi!")
    .required("Bo'sh bo'lmasligi kerak!"),
});
