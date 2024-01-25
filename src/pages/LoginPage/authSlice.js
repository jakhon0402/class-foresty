import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendVerificationCode = createAsyncThunk(
  "auth/sendVerificationCode",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/sendVerificationCode", body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/verify", body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/me",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.get("/currentUser");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    loading: false,
    error: null,

    isCodeSend: false,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        localStorage.setItem("token", payload?.data?.access_token);
        localStorage.setItem("refresh-token", payload?.data?.refresh_token);
        toast.success(payload?.message);
        state.isLoggedIn = true;
        window.location.href = "/";
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload?.message);

        if (payload?.status === "USER_NOT_VERIFIED") {
          window.open(`/verify/${payload?.username}`, "_blank");
        }

        state.error = payload;
      })

      .addCase(sendVerificationCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendVerificationCode.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isCodeSend = true;
        toast.success(payload?.message);
      })
      .addCase(sendVerificationCode.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload?.message);
        state.error = payload;
      })

      .addCase(verify.pending, (state) => {
        state.loading = true;
      })
      .addCase(verify.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload?.message);
        setTimeout(() => {
          window.close();
        }, 3000);
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload?.message);
        state.error = payload;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentUser = payload?.data;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.status === 500) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh-token");
          window.location.href = "/";
        }

        state.error = payload;
      });
  },
});

export const { resetError, logout } = authSlice.actions;

export default authSlice.reducer;
