import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../../config/Api";
import { toast } from "react-toastify";

export const getAllGroups = createAsyncThunk(
  "groups/getAll",
  async (body = {}) => {
    const response = await Api.get("/t/group");
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
export const createGroupLessonData = createAsyncThunk(
  "groups/createLessonData",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `/group/lesson/data/${body?.id}`,
        body?.data
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroupLessonData = createAsyncThunk(
  "groups/updateLessonData",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.put(
        `/group/lesson/data/${body?.id}`,
        body?.data
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGroupLessonAtts = createAsyncThunk(
  "groups/getLessonAtts",
  async (body = {}) => {
    const response = await Api.get(`/group/lesson/att/${body}`);
    return response.data;
  }
);

export const createGroupLessonAtts = createAsyncThunk(
  "groups/createLessonAtts",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/group/lesson/att/${body?.id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const acceptGroupLessonAtts = createAsyncThunk(
  "groups/acceptLessonAtts",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `/group/lesson/att/accept/${body?.id}`,
        body?.data
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGroupSettings = createAsyncThunk(
  "groups/getSettings",
  async (body = {}) => {
    const response = await Api.get(`/group/settings/${body}`);
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

export const getGroupStudentPaymentByMonth = createAsyncThunk(
  "groups/getStudentPaymentByMonth",
  async (body = {}) => {
    const response = await Api.get(`/group/payment/students/${body}`);
    return response.data;
  }
);

export const getTeacherPaymentsByGroupId = createAsyncThunk(
  "groups/getPaymentsByGroupId",
  async (body = {}) => {
    const response = await Api.get(`/teacher/payments/${body?.id}`);
    return response.data;
  }
);

export const addStudentToGroup = createAsyncThunk(
  "groups/addStudent",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/group/students`, body?.data);
      body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeStudentFromGroup = createAsyncThunk(
  "groups/removeStudent",
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/group/students/${body?.id}`);
      body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const createGroup = createAsyncThunk(
  "groups/create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/group", body?.data);
      body?.navigate();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroup = createAsyncThunk(
  "groups/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/group/${body?.id}`, body?.data);
      // body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroupSettings = createAsyncThunk(
  "groups/updateSettings",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/group/settings/${body?.id}`, body?.data);
      // window.location.reload();
      // body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroupLessonTimes = createAsyncThunk(
  "groups/updateLessonTimes",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.put(
        `/group/lessonTimes/${body?.id}`,
        body?.data
      );
      body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/group/${body?.id}`);

      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const receiveGroupStudentPayment = createAsyncThunk(
  "groups/receivePayment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/payment/receive`, body?.data);
      // body?.onClose();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
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
    floors: null,
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
      .addCase(createGroupLessonData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(createGroupLessonData.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonData = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(createGroupLessonData.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ GET group lesson data ------------------/////
      .addCase(updateGroupLessonData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(updateGroupLessonData.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonData = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(updateGroupLessonData.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
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

      ///------------ GET group lesson data ------------------/////
      .addCase(createGroupLessonAtts.pending, (state) => {
        // state.loading = true;
      })
      .addCase(createGroupLessonAtts.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonAtts = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(createGroupLessonAtts.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ GET group lesson data ------------------/////
      .addCase(acceptGroupLessonAtts.pending, (state) => {
        // state.loading = true;
      })
      .addCase(acceptGroupLessonAtts.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.lessonAtts = payload?.data;
        if (payload?.data.length > 0) {
          state.lessonDate = payload?.data[0]?.groupLesson;
        }
        toast.success(payload?.message);
      })
      .addCase(acceptGroupLessonAtts.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ GET group months ------------------/////
      .addCase(getGroupMonths.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupMonths.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.lessons = null;

        let groupMonths = payload.data.sort((a, b) => a?.month - b?.month);
        state.months = groupMonths;
      })
      .addCase(getGroupMonths.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET teacher payments by group id  ------------------/////
      .addCase(getTeacherPaymentsByGroupId.pending, (state) => {})
      .addCase(getTeacherPaymentsByGroupId.fulfilled, (state, { payload }) => {
        let payments = payload?.data.sort(
          (a, b) => a.groupMonth?.month - b?.groupMonth?.month
        );
        state.teacherPayments = payments;
      })
      .addCase(getTeacherPaymentsByGroupId.rejected, (state, action) => {
        state.error = action.payload;
      })

      ///------------ GET group months ------------------/////
      .addCase(getGroupSettings.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGroupSettings.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.settings = payload?.data;
      })
      .addCase(getGroupSettings.rejected, (state, action) => {
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
      .addCase(getGroupStudentPaymentByMonth.pending, (state) => {
        state.paymentsLoading = true;
      })
      .addCase(
        getGroupStudentPaymentByMonth.fulfilled,
        (state, { payload }) => {
          state.paymentsLoading = false;
          state.studentPayments = payload?.data;
        }
      )
      .addCase(getGroupStudentPaymentByMonth.rejected, (state, action) => {
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
        // students.map((el) => {
        //   Object.keys(el.student.student.user).forEach((key) => {
        //     el[`student.user.${key}`] = el.student.student.user[key];
        //   });
        //   delete el.student.student.user;

        //   Object.keys(el.student).forEach((key) => {
        //     el[`student.${key}`] = el.student[key];
        //   });
        //   delete el.student;
        //   return el;
        // });

        state.students = students;
      })
      .addCase(getGroupStudents.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })

      ///------------ ADD student to group ------------------/////
      .addCase(addStudentToGroup.pending, (state) => {
        state.addStudentLoading = true;
      })
      .addCase(addStudentToGroup.fulfilled, (state, { payload }) => {
        state.addStudentLoading = false;

        let currStudent = payload?.data;

        // Object.keys(currStudent.student.student.user).forEach((key) => {
        //   currStudent[`student.user.${key}`] =
        //     currStudent.student.student.user[key];
        // });
        // delete currStudent.student.student.user;
        state.students = [currStudent, ...state.students];
        toast.success(payload?.message);
      })
      .addCase(addStudentToGroup.rejected, (state, { payload }) => {
        state.addStudentLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ REMOVE student from GROUP ------------------/////
      .addCase(removeStudentFromGroup.pending, (state) => {
        // state.loading = true;
      })
      .addCase(removeStudentFromGroup.fulfilled, (state, { payload }) => {
        // state.loading = false;

        const ctgIndex = findIndex(state.students, { id: payload?.data?.id });
        let currStudent = payload?.data;

        state.students[ctgIndex] = currStudent;
        toast.success(payload?.message);
      })
      .addCase(removeStudentFromGroup.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ CREATE groups ------------------/////
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.groups = [payload?.data, ...state.groups];
        toast.success(payload?.message);
      })
      .addCase(createGroup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ delete groups ------------------/////
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, { payload }) => {
        state.loading = false;
        window.location.href = "/groups";

        // const ctgIndex = findIndex(state.groups, { id: payload?.data?.id });
        // state.groups.splice(ctgIndex, 1);
        toast.success(payload?.message);
      })
      .addCase(deleteGroup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ UPDATE groups ------------------/////
      .addCase(updateGroup.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateGroup.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        // const ctgIndex = findIndex(state.groups, { id: payload?.data?.id });
        // state.groups[ctgIndex] = payload?.data;
        state.group = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(updateGroup.rejected, (state, { payload }) => {
        state.updateLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ UPDATE group SETTINGS ------------------/////
      .addCase(updateGroupSettings.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateGroupSettings.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        // const ctgIndex = findIndex(state.groups, { id: payload?.data?.id });
        // state.groups[ctgIndex] = payload?.data;
        state.settings = null;

        state.group = payload?.data?.group;
        state.settings = payload?.data?.settings;
        toast.success(payload?.message);
      })
      .addCase(updateGroupSettings.rejected, (state, { payload }) => {
        state.updateLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ UPDATE group lesson times ------------------/////
      .addCase(updateGroupLessonTimes.pending, (state) => {
        // state.updateLoading = true;
      })
      .addCase(updateGroupLessonTimes.fulfilled, (state, { payload }) => {
        // state.updateLoading = false;

        // const ctgIndex = findIndex(state.groups, { id: payload?.data?.id });
        // state.groups[ctgIndex] = payload?.data;
        state.lessonTimes = payload?.data;

        toast.success(payload?.message);
      })
      .addCase(updateGroupLessonTimes.rejected, (state, { payload }) => {
        // state.updateLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ RECEIVE group student payment ------------------/////
      .addCase(receiveGroupStudentPayment.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(receiveGroupStudentPayment.fulfilled, (state, { payload }) => {
        state.paymentLoading = false;

        const ctgIndex = findIndex(state.studentPayments, {
          id: payload?.data?.id,
        });
        state.studentPayments[ctgIndex] = payload?.data;
        const ctgIndexMonth = findIndex(state.paymentMonths, {
          id: payload?.data?.groupPaymentMonth?.id,
        });
        state.paymentMonths[ctgIndexMonth] = payload?.data?.groupPaymentMonth;

        toast.success(payload?.message);
      })
      .addCase(receiveGroupStudentPayment.rejected, (state, { payload }) => {
        state.paymentLoading = false;
        state.error = payload;
        toast.error(payload?.message);
      });
  },
});

export const { resetError, setGroupLessonDate } = groupsSlice.actions;

export default groupsSlice.reducer;
