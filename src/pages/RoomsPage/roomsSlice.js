import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Api from "../../config/Api";
import { toast } from "react-toastify";
import { changeFloorState } from "./utils";

export const getAllRooms = createAsyncThunk(
  "rooms/getAll",
  async (body = {}) => {
    const response = await Api.get("/room");
    return response.data;
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: null,
    floors: null,
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
      ///------------ GET rooms ------------------/////
      .addCase(getAllRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload?.data;
        state.floors = changeFloorState(state);
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = roomsSlice.actions;

export default roomsSlice.reducer;
