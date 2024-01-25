import { STUDENT, TEACHER } from "../data/constants";
import teacherImg from "../../../assets/images/teacher.png";
import studentImg from "../../../assets/images/student.png";

export const getLoginImage = (role) => {
  switch (role) {
    case TEACHER:
      return teacherImg;
    case STUDENT:
      return studentImg;
  }
};

export const getStartContentUsername = (role) => {
  switch (role) {
    case TEACHER:
      return "T-";
    case STUDENT:
      return "S-";
  }
};
