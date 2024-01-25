import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";

export const getAllDocuments = createAsyncThunk(
  "documents/getAll",
  async (body = {}) => {
    const response = await Api.get(`/document/${body}`);
    return response.data;
  }
);

export const downloadDocument = async (body = {}) => {
  try {
    const response = await Api.get(`/document/download/${body?.id}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", body?.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    if (!err.response) {
      throw err;
    }
  }
};

export const uploadDocument = createAsyncThunk(
  "documents/upload",
  async (body, { rejectWithValue }) => {
    const formData = new FormData();

    formData.append("file", body?.documentFile);
    formData.append("document-name", body?.documentName);
    formData.append("edu-user-id", body?.userId);

    try {
      const response = await Api.post("/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
    }
  }
);

// export const updateDocument = createAsyncThunk(
//   "documents/update",
//   async (body, { rejectWithValue }) => {
//     try {
//       const response = await Api.put(`/document/${body?.id}`, body);
//       return response.data;
//     } catch (err) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/document/${body?.id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: null,

    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearDatas: (state) => {
      state.documents = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET documents ------------------/////
      .addCase(getAllDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload?.data;
      })
      .addCase(getAllDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE documents ------------------/////
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadDocument.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.documents = [payload?.data, ...state.documents];
        toast.success(payload?.message);
      })
      .addCase(uploadDocument.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      })

      ///------------ delete documents ------------------/////
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, { payload }) => {
        state.loading = false;

        const ctgIndex = findIndex(state.documents, { id: payload?.data?.id });
        state.documents.splice(ctgIndex, 1);
        toast.success(payload?.message);
      })
      .addCase(deleteDocument.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload?.message);
      });
  },
});

export const { resetError, clearDatas } = documentsSlice.actions;

export default documentsSlice.reducer;
