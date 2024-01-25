import { cloneDeep } from "lodash";
import {
  cleanStringForRegex,
  getMoneyPatternInput,
  getPhoneNumberPattern,
} from "../../utils/regex";

export const getReqBody = (values) => {
  let reqBody = cloneDeep(values);

  singleSelectedDatas
    .filter((el) => el.name in reqBody)
    .forEach((el) => {
      if (el.type == "number") {
        reqBody[el.name] = +[...reqBody[el.name]][0];
        return;
      }
      reqBody[el.name] = [...reqBody[el.name]][0];
    });

  if ("birthDate" in reqBody) {
    reqBody.birthDate = new Date(reqBody.birthDate).toISOString();
  }
  if ("jobStartsDate" in reqBody) {
    reqBody.jobStartsDate = new Date(reqBody.jobStartsDate).toISOString();
  }
  if ("startsDate" in reqBody) {
    reqBody.startsDate = new Date(reqBody.startsDate).toISOString();
  }

  if ("phoneNumber" in reqBody) {
    reqBody.phoneNumber = cleanStringForRegex(reqBody.phoneNumber);
  }
  if ("parentPhoneNumber" in reqBody) {
    reqBody.parentPhoneNumber = cleanStringForRegex(reqBody.parentPhoneNumber);
  }
  if ("secondaryParentPhoneNumber" in reqBody) {
    reqBody.secondaryParentPhoneNumber = cleanStringForRegex(
      reqBody.secondaryParentPhoneNumber
    );
  }

  if ("salary" in reqBody) {
    reqBody.salary = +cleanStringForRegex(reqBody.salary);
  }

  if ("price" in reqBody) {
    reqBody.price = +cleanStringForRegex(reqBody.price);
  }

  if ("amount" in reqBody) {
    reqBody.amount = +cleanStringForRegex(reqBody.amount);
  }

  if ("floor" in reqBody) {
    reqBody.floor = +reqBody.floor;
  }

  return reqBody;
};

export const getHandleChange = (name, setFieldValue, handleChange) => {
  if (
    name === "phoneNumber" ||
    name === "owner_phoneNumber" ||
    name === "parentPhoneNumber" ||
    name === "secondaryParentPhoneNumber"
  ) {
    return (e) => {
      setFieldValue(name, getPhoneNumberPattern(e.target.value));
    };
  }

  if (name === "salary" || name == "price" || name == "amount") {
    return (e) => {
      setFieldValue(name, getMoneyPatternInput(e.target.value));
    };
  }

  return handleChange;
};

const singleSelectedDatas = [
  // { name: "role", type: "string" },
  // { name: "colorName", type: "string" },
  // { name: "floor", type: "number" },
];
