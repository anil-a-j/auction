import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  askService,
  itemTypeService,
  searchItemsService,
} from "./itemServices";

const initialState = {
  searchResult: "",
  searchResultStatus:"",
  searchResultError:"",
  itemAsked: "",
  itemAskedStatus: "",
  itemAskedError: "",
  itemTypes: "",
  itemTypesStatus:"",
  itemTypesError: "",
};

export const askItem = createAsyncThunk(
  "item/askitem",
  async (data, thunkAPI) => {
    return await askService(data, thunkAPI);
  }
);

export const loadItemTypes = createAsyncThunk("item/itemtypes", async () => {
  return await itemTypeService();
});

export const searchItems = createAsyncThunk(
  "item/searchItems",
  async (data, thunkAPI) => {
    return await searchItemsService(data, thunkAPI);
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(askItem.pending, (state, action) => {
        state.itemAskedStatus = "sending";
      })
      .addCase(askItem.fulfilled, (state, action) => {
        state.itemAsked = action.payload;
        state.itemAskedStatus = "Request added";
      })
      .addCase(askItem.rejected, (state, action) => {
        state.itemStatus = "";
        state.itemAskedError = action.error.message;
      })
      .addCase(loadItemTypes.pending, (state, action) => {
        state.itemTypesStatus = "loading";
      })
      .addCase(loadItemTypes.fulfilled, (state, action) => {
        state.itemTypes = action.payload;
        state.itemTypesStatus = "";
      })
      .addCase(loadItemTypes.rejected, (state, action) => {
        state.itemTypesError = action.error.message;
      })
      .addCase(searchItems.pending, (state, action) => {
        state.searchResultStatus = "loading";
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.searchResult = action.payload;
        state.searchResultStatus = "loaded";
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.searchResultError = action.error.message;
      });
  },
});

export const selectItem = (state) => state.item;

export default itemSlice.reducer;
