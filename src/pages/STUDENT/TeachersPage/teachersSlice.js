import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../../config/Api";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const getAllTeachers = createAsyncThunk(
  "teachers/getAll",
  async (body = {}) => {
    const response = await Api.get("/teacher");
    return response.data;
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teacher: null,
    teachers: null,
    groups: null,

    paymentGroups: null,
    payments: null,

    floors: null,
    loading: false,
    updateLoading: false,
    paymentLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET teachers ------------------/////
      .addCase(getAllTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        const teachers = action.payload?.data;

        state.teachers = teachers;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = teachersSlice.actions;

export default teachersSlice.reducer;
