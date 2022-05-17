import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/authSlice";
import itemSliceReducer from "./item/itemSlice";
import locationSliceReducer from "./location/locationSlice";

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    item: itemSliceReducer,
    location: locationSliceReducer,
  },
});
