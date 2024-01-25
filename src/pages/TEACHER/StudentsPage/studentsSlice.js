import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../../config/Api";
import { toast } from "react-toastify";

export const getAllStudents = createAsyncThunk(
  "students/getAll",
  async (body = {}) => {
    const response = await Api.get("/t/group/students");
    return response.data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: null,
    loading: false,

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
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;

        state.students = action.payload?.data;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = studentsSlice.actions;

export default studentsSlice.reducer;
