import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryService, stateService } from "./locationServices";

const initialState = {
  countries: "",
  states: "",
  locationStatus: "",
  locationError: "",
};

export const loadCountries = createAsyncThunk("item/countries", async () => {
  return await countryService();
});

export const loadStates = createAsyncThunk("item/states", async (data) => {
  return await stateService(data);
});

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.locationStatus = "loading";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.locationStatus = "";
        state.countries = action.payload;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.locationError = action.error.message;
      })
      .addCase(loadStates.pending, (state, action) => {
        state.locationStatus = "loading";
      })
      .addCase(loadStates.fulfilled, (state, action) => {
        state.locationStatus = "";
        state.states = action.payload;
      })
      .addCase(loadStates.rejected, (state, action) => {
        state.locationError = action.error.message;
      });
  },
});

export const selectLocation = (state) => state.location;

export default locationSlice.reducer;
