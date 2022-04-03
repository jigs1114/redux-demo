import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataService from "../services/DataService";
const initialState = [];
export const createData = createAsyncThunk(
  "dataLists/create",
  async ({ title, description }) => {
    const res = await DataService.create({ title, description });
    return res.data;
  }
);
export const retrieveData = createAsyncThunk(
  "dataLists/retrieve",
  async () => {
    const res = await DataService.getAll();
    return res.data.data;
  }
);
export const updateData = createAsyncThunk(
  "dataLists/update",
  async ({ id, data }) => {
    const res = await DataService.update(id, data);
    return res.data;
  }
);
export const deleteData = createAsyncThunk(
  "dataLists/delete",
  async ({ id }) => {
    await DataService.remove(id);
    return { id };
  }
);
export const findDataByTitle = createAsyncThunk(
  "dataLists/findByTitle",
  async ({ title }) => {
    const res = await DataService.findByTitle(title);
    return res.data.data;
  }
);
const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: {
    [createData.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveData.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateData.fulfilled]: (state, action) => {
      const index = state.findIndex(Data => Data.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteData.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [findDataByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});
const { reducer } = dataSlice;
export default reducer;