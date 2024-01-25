import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../../config/Api";
import { toast } from "react-toastify";

export const getAllGroups = createAsyncThunk(
  "groups/getAll",
  async (body = {}) => {
    const response = await Api.get("/s/group");
    return response.data;
  }
);

export const getGroup = createAsyncThunk("groups/get", async (body = {}) => {
  const response = await Api.get(`/group/${body}`);
  return response.data;
});

export const getGroupTeacher = createAsyncThunk(
  "groups/getTeacher",
  async (body = {}) => {
    const response = await Api.get(`/group/teacher/${body}`);
    return response.data;
  }
);

export const getGroupLessonTimes = createAsyncThunk(
  "groups/getLessonTimes",
  async (body = {}) => {
    const response = await Api.get(`/group/lessonTimes/${body}`);
    return response.data;
  }
);

export const getGroupStudents = createAsyncThunk(
  "groups/getStudents",
  async (body = {}) => {
    const response = await Api.get(`/group/students/${body}`);
    return response.data;
  }
);

export const getGroupMonths = createAsyncThunk(
  "groups/getMonths",
  async (body = {}) => {
    const response = await Api.get(`/group/months/${body}`);
    return response.data;
  }
);

export const getGroupLessons = createAsyncThunk(
  "groups/getLessons",
  async (body = {}) => {
    const response = await Api.get(`/group/lessons/${body}`);
    return response.data;
  }
);

export const getGroupLessonData = createAsyncThunk(
  "groups/getLessonData",
  async (body = {}) => {
    const response = await Api.get(`/group/lesson/data/${body}`);
    return response.data;
  }
);

export const getGroupLessonAtts = createAsyncThunk(
  "groups/getLessonAtts",
  async (body = {}) => {
    const response = await Api.get(`/group/lesson/att/${body}`);
    return response.data;
  }
);

export const getGroupPaymentMonths = createAsyncThunk(
  "groups/getPaymentMonths",
  async (body = {}) => {
    const response = await Api.get(`/group/payment/months/${body}`);
    return response.data;
  }
);

export const getGroupStudentPaymentsByGroupId = createAsyncThunk(
  "groups/getGroupStudentPaymentsByGroupId",
  async (body = {}) => {
    const response = await Api.get(`/s/group/payments/byGroupId/${body}`);
    return response.data;
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    group: null,
    groups: null,
    lessonTimes: null,
    students: null,
    teacher: null,
    settings: null,

    months: null,
    lessons: null,

    lessonData: null,
    lessonAtts: null,
    lessonDate: null,

    teacherPayments: null,

    paymentMonths: null,
    studentPayments: null,

    loading: false,
    updateLoading: false,
    addStudentLoading: false,
    paymentsLoading: false,
    paymentLoading: false,

    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setGroupLessonDate: (state, { payload }) => {
      state.lessonData = null;
      state.lessonDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET groups ------------------/////
      .addCase(getAllGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = false;

        state.groups = action.payload?.data;
        state.group = null;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group ------------------/////
      .addCase(getGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.group = null;
        state.group = payload?.data;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group teacher ------------------/////
      .addCase(getGroupTeacher.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupTeacher.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.teacher = payload?.data;
      })
      .addCase(getGroupTeacher.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group lesson times ------------------/////
      .addCase(getGroupLessonTimes.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupLessonTimes.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonTimes = payload?.data;
      })
      .addCase(getGroupLessonTimes.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group lessons ------------------/////
      .addCase(getGroupLessons.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupLessons.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessons = payload?.data;
      })
      .addCase(getGroupLessons.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group lesson data ------------------/////
      .addCase(getGroupLessonData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupLessonData.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonData = payload?.data;
      })
      .addCase(getGroupLessonData.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group lesson data ------------------/////
      .addCase(getGroupLessonAtts.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupLessonAtts.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonAtts = payload?.data;
      })
      .addCase(getGroupLessonAtts.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group months ------------------/////
      .addCase(getGroupMonths.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupMonths.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.lessons = null;

        let groupMonths = [...payload.data];
        groupMonths = groupMonths.sort((a, b) => a?.month - b?.month);
        state.months = groupMonths;
      })
      .addCase(getGroupMonths.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group payment months ------------------/////
      .addCase(getGroupPaymentMonths.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupPaymentMonths.fulfilled, (state, { payload }) => {
        // state.loading = false;
        let groupPaymentMonths = payload.data.sort(
          (a, b) => a.groupMonth?.month - b.groupMonth?.month
        );
        state.paymentMonths = groupPaymentMonths;
      })
      .addCase(getGroupPaymentMonths.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET group student payments BY month ------------------/////
      .addCase(getGroupStudentPaymentsByGroupId.pending, (state) => {
        state.paymentsLoading = true;
      })
      .addCase(
        getGroupStudentPaymentsByGroupId.fulfilled,
        (state, { payload }) => {
          let studentPayments = payload.data.sort(
            (a, b) =>
              a?.groupPaymentMonth?.groupMonth?.month -
              b?.groupPaymentMonth?.groupMonth?.month
          );
          state.paymentsLoading = false;
          state.studentPayments = studentPayments;
        }
      )
      .addCase(getGroupStudentPaymentsByGroupId.rejected, (state, action) => {
        state.paymentsLoading = false;
        state.error = action.payload;
      })

      ///------------ GET group students ------------------/////
      .addCase(getGroupStudents.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupStudents.fulfilled, (state, { payload }) => {
        // state.loading = false;

        const students = payload?.data;

        state.students = students;
      })
      .addCase(getGroupStudents.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, setGroupLessonDate } = groupsSlice.actions;

export default groupsSlice.reducer;
