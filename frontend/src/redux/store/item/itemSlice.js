import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  askService,
  itemTypeService,
  // loadSearchItemsService,
  searchItemsService,
} from "./itemServices";

const initialState = {
  searchResult: "",
  itemStatus: "",
  itemAsked: "",
  itemAskError: "",
  itemTypes: "",
  itemTypesError: "",
  searchResultError: "",
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
        state.itemStatus = "sending";
      })
      .addCase(askItem.fulfilled, (state, action) => {
        state.itemAsked = action.payload;
        state.itemStatus = "Request added";
      })
      .addCase(askItem.rejected, (state, action) => {
        state.itemStatus = "";
        state.itemAskError = action.error.message;
      })
      .addCase(loadItemTypes.pending, (state, action) => {
        state.itemStatus = "loading";
      })
      .addCase(loadItemTypes.fulfilled, (state, action) => {
        state.itemTypes = action.payload;
        state.itemStatus = "";
      })
      .addCase(loadItemTypes.rejected, (state, action) => {
        state.itemTypesError = action.error.message;
      })
      .addCase(searchItems.pending, (state, action) => {
        state.itemStatus = "loading";
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.searchResult = action.payload;
        state.itemStatus = "";
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.searchResultError = action.error.message;
      });
  },
});

export const selectItem = (state) => state.item;

export default itemSlice.reducer;
