import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const getAllSubjects = createAsyncThunk(
  "subjects/getAll",
  async (body = {}) => {
    const response = await Api.get("/subject");
    return response.data;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: null,
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
      ///------------ GET subjects ------------------/////
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload?.data;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = subjectsSlice.actions;

export default subjectsSlice.reducer;
