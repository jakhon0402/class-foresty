import date from "date-and-time";
import { getPhoneNumberPattern } from "../../../utils/regex";

export const getUpdateInitialValuesProfileData = (user = {}) => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    fatherName: user?.fatherName,
    username: user?.username,
    email: user?.email,
    phoneNumber: getPhoneNumberPattern(user?.phoneNumber),
    birthDate: date.format(new Date(user?.birthDate), "YYYY-MM-DD"),
  };
};
