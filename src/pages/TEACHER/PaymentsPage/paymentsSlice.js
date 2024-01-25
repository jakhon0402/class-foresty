import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../../config/Api";
import { toast } from "react-toastify";

export const getTeacherPaymentGroups = createAsyncThunk(
  "payments/getPaymentGroups",
  async (body = {}) => {
    const response = await Api.get(`/teacher/payments/groups/${body?.id}`);
    return response.data;
  }
);

export const getTeacherPaymentsByGroupId = createAsyncThunk(
  "payments/getPaymentsByGroupId",
  async (body = {}) => {
    const response = await Api.get(`/teacher/payments/${body?.id}`);
    return response.data;
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    paymentGroups: null,
    payments: null,
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
      .addCase(getTeacherPaymentGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherPaymentGroups.fulfilled, (state, action) => {
        state.loading = false;

        state.paymentGroups = action.payload?.data;
      })
      .addCase(getTeacherPaymentGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ GET teacher payments by group id  ------------------/////
      .addCase(getTeacherPaymentsByGroupId.pending, (state) => {})
      .addCase(getTeacherPaymentsByGroupId.fulfilled, (state, { payload }) => {
        let payments = payload?.data.sort(
          (a, b) => a.groupMonth?.month - b?.groupMonth?.month
        );
        state.payments = payments;
      })
      .addCase(getTeacherPaymentsByGroupId.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError } = paymentsSlice.actions;

export default paymentsSlice.reducer;
