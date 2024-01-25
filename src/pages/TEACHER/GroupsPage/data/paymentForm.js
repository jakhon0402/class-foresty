import * as Yup from "yup";
import { cleanStringForRegex } from "../../../../utils/regex";

export const fields = [
  {
    name: "amount",
    type: "text",
    label: "To'lov miqdori",
    placeholder: "To'lov miqdorini kiriting...",
    isRequired: true,
  },

  {
    name: "type",
    type: "select",
    label: "To'lov turi",
    placeholder: "To'lov turini tanlang...",
    isRequired: true,
  },
];

export const emptyValues = {
  amount: "",
};

export const validationSchema = (min, max) =>
  Yup.object().shape({
    amount: Yup.string()
      .test("is-number", "Amount must be a valid number", (value) => {
        // Check if the value can be converted to a number
        const parsedValue = parseFloat(+cleanStringForRegex(value));
        return !isNaN(parsedValue);
      })
      .test(
        "min",
        `To'lov miqdori ${min} so'mda yuqori bo'lishi kerak!`,
        (value) => {
          // Check if the value is greater than or equal to the specified min
          const parsedValue = parseFloat(+cleanStringForRegex(value));
          return parsedValue >= min;
        }
      )
      .test(
        "max",
        `To'lov miqdori ${max} so'mdan kam bo'lishi kerak!`,
        (value) => {
          // Check if the value is less than or equal to the specified max
          const parsedValue = parseFloat(+cleanStringForRegex(value));
          return parsedValue <= max;
        }
      )
      .required("Nomi bo'sh bo'lmasligi kerak!"),
    type: Yup.string().required("Bo'sh bo'lmasligi kerak!"),
  });
