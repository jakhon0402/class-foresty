import * as Yup from "yup";

export const emptyValues = {
  username: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.number("Raqamlar kiriting!").required(
    "Username bo'sh bo'lmasligi kerak!"
  ),
  password: Yup.string().required("Parol bo'sh bo'lmasligi kerak!"),
});
