import * as Yup from "yup";
export const updateProfilePasswordFields = [
  {
    name: "oldPassword",
    type: "text",
    label: "Eski parol",
    placeholder: "Eski parolni kiriting...",
    isRequired: true,
  },
  {
    name: "newPassword",
    type: "text",
    label: "Yangi parol",
    placeholder: "Yangi parolni kiriting...",
    isRequired: true,
  },
  {
    name: "reNewPassword",
    type: "text",
    label: "Qayta yangi parol",
    placeholder: "Yangi parolni qayta kiriting...",
    isRequired: true,
  },
];

export const updateProfilePasswordValues = {
  oldPassword: "",
  newPassword: "",
  reNewPassword: "",
};

export const updateProfilePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  newPassword: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  reNewPassword: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
});

export const updateProfileDataFields = [
  {
    name: "firstName",
    type: "text",
    label: "Ismi",
    placeholder: "Ismini kiriting...",
    isRequired: true,
  },
  {
    name: "lastName",
    type: "text",
    label: "Familiyasi",
    placeholder: "Familiyasini kiriting...",
    isRequired: true,
  },
  {
    name: "fatherName",
    type: "text",
    label: "Otasining ismi",
    placeholder: "Otasining ismini kiriting...",
    isRequired: true,
  },

  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Usernameni kiriting...",
    isRequired: true,
  },
  {
    name: "email",
    type: "text",
    label: "Emaili",
    placeholder: "Emailini kiriting...",
    isRequired: true,
  },

  {
    name: "phoneNumber",
    type: "text",
    label: "Tel. raqami",
    isRequired: true,
    startContent: "+998",
  },

  {
    name: "birthDate",
    type: "date",
    label: "Tug'ilgan kuni",
    placeholder: "Tug'ilgan kunini kiriting...",
    isRequired: true,
  },
];

export const updateProfileDataEmptyValues = {
  firstName: "",
  lastName: "",
  fatherName: "",
  username: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
};

export const updateProfileDataValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  lastName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  fatherName: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  email: Yup.string()
    .email("Yaroqsiz email!")
    .required("Bo'sh bo'lmasligi kerak!"),
  phoneNumber: Yup.string()
    .matches(/^\(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Tel. raqamni to'g'ri kiriting!")
    .required("Bo'sh bo'lmasligi kerak!"),
  birthDate: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
});

export const updateAddressFields = [
  {
    name: "region",
    type: "select",
    label: "Viloyat",
    placeholder: "Viloyatni tanlang...",
    // isRequired: true,
  },
  {
    name: "districtOrCity",
    type: "text",
    label: "Shahar yoki tuman",
    placeholder: "Shahar yoki tumanni kiriting...",
    // isRequired: true,
  },
  {
    name: "street",
    type: "text",
    label: "Ko'cha / Manzil",
    placeholder: "Ko'cha / Manzilni kiriting...",
    // isRequired: true,
  },
];

export const updateAddressEmptyValues = {
  region: "",
  districtOrCity: "",
  street: "",
};

export const updateAddressValidationSchema = Yup.object().shape({
  region: Yup.string(),
  districtOrCity: Yup.string(),
  street: Yup.string(),
});
