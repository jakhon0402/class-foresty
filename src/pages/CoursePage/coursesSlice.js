import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (body = {}) => {
    const response = await Api.get("/course");
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: null,

    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET courses ------------------/////
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload?.data;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = coursesSlice.actions;

export default coursesSlice.reducer;
