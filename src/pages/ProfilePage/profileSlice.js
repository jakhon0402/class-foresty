import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const getUserProfile = createAsyncThunk(
  "profile/getUser",
  async (body = {}) => {
    const response = await Api.get("/user");
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/user/updateData/`, body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "profile/updatePassword",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/user/updatePassword/`, body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserProfileAddress = createAsyncThunk(
  "profile/updateAddress",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/user/updateAddress`, body);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateImage = createAsyncThunk(
  "profile/updateImage",
  async (body, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", body?.file);
    try {
      const response = await Api.post(body?.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      body?.removeSelection();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "user/deleteImage",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(body?.url);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    smsAccount: null,
    smsEskizUser: null,
    socialLinks: null,
    user: null,
    uploadLoading: false,
    uploadLogoLoading: false,
    uploadHILoading: false,
    loading: false,

    linksLoaded: false,
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
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE subjects ------------------/////
      .addCase(updateUserProfile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.user = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ CREATE subjects ------------------/////
      .addCase(updateUserPassword.pending, (state) => {
        // state.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        // state.loading = false;
        toast.success(payload?.message);
      })
      .addCase(updateUserPassword.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ CREATE subjects ------------------/////
      .addCase(updateUserProfileAddress.pending, (state) => {
        // state.loading = true;
      })
      .addCase(updateUserProfileAddress.fulfilled, (state, { payload }) => {
        // state.loading = false;

        state.user = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(updateUserProfileAddress.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ CREATE update avatar ------------------/////
      .addCase(updateImage.pending, (state, { meta }) => {
        switch (meta?.arg?.url) {
          case "/user/updateLogo":
            state.uploadLogoLoading = true;
            break;
          case "/user/updateHeaderImage":
            state.uploadHILoading = true;
            break;
          default:
            state.uploadLoading = true;
            break;
        }
      })
      .addCase(updateImage.fulfilled, (state, { payload, meta }) => {
        switch (meta?.arg?.url) {
          case "/user/updateLogo":
            state.uploadLogoLoading = false;
            break;
          case "/user/updateHeaderImage":
            state.uploadHILoading = false;
            break;
          default:
            state.uploadLoading = false;
            break;
        }

        state.user = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(updateImage.rejected, (state, { payload, meta }) => {
        switch (meta?.arg?.url) {
          case "/user/updateLogo":
            state.uploadLogoLoading = false;
            break;
          case "/user/updateHeaderImage":
            state.uploadHILoading = false;
            break;
          default:
            state.uploadLoading = false;
            break;
        }
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ delete avatar ------------------/////
      .addCase(deleteImage.pending, (state) => {
        // state.loading = true;
      })
      .addCase(deleteImage.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.user = payload?.data;
        toast.success(payload?.message);
      })
      .addCase(deleteImage.rejected, (state, { payload }) => {
        // state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      });
  },
});

export const { resetError } = profileSlice.actions;

export default profileSlice.reducer;
