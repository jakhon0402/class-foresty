import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/LoginPage/authSlice";
import profileReducer from "../pages/ProfilePage/profileSlice";

import documentReducer from "../pages/Documents/documentSlice";
import roomReducer from "../pages/RoomsPage/roomsSlice";
import subjectReducer from "../pages/SubjectsPage/subjectsSlice";
import courseReducer from "../pages/CoursePage/coursesSlice";

import teacherStudentReducer from "../pages/TEACHER/StudentsPage/studentsSlice";
import teacherGroupReducer from "../pages/TEACHER/GroupsPage/groupsSlice";
import teacherPaymentsReducer from "../pages/TEACHER/PaymentsPage/paymentsSlice";

import studentGroupReducer from "../pages/STUDENT/GroupsPage/groupsSlice";
import studentTeachersReducer from "../pages/STUDENT/TeachersPage/teachersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,

    rooms: roomReducer,
    subjects: subjectReducer,
    courses: courseReducer,
    documents: documentReducer,

    tstudents: teacherStudentReducer,
    tgroups: teacherGroupReducer,
    tpayments: teacherPaymentsReducer,

    sgroups: studentGroupReducer,
    steachers: studentTeachersReducer,
  },
});
