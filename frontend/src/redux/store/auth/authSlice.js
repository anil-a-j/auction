import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadUserInfo from "../commonServices/loadUserInfo";
import {
  registerService,
  logInService,
  logOutService,
  updateService,
  deleteImage,
  deleteAccount,
} from "./authServices";

const initialState = {
  userInfo: "",
  userStatus: "",
  userError: "",
};

export const checkToken = createAsyncThunk("auth/checktoken", async () => {
  return await loadUserInfo();
});

export const register = createAsyncThunk("auth/register", async (data) => {
  return await registerService(data);
});

export const logIn = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  return await logInService(data, thunkAPI);
});

export const logOut = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    return await logOutService(thunkAPI);
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async (data, thunkAPI) => {
    return await updateService(data, thunkAPI);
  }
);

export const deleteUserImage = createAsyncThunk(
  "auth/deleteuseimage",
  async () => {
    return await deleteImage();
  }
);

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteuseraccount",
  async () => {
    return await deleteAccount();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.userInfo = "";
        state.userError = "";
        state.userStatus = "";
      })
      .addCase(register.pending, (state, action) => {
        state.userStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
        state.userError = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
        state.userStatus = "";
      })
      .addCase(logIn.pending, (state, action) => {
        state.userStatus = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
        state.userError = "";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userInfo = "";
        state.userStatus = "";
        state.userError = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      })
      .addCase(update.pending, (state, action) => {
        state.userStatus = "updating";
        state.userError = "";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
      })
      .addCase(update.rejected, (state, action) => {
        state.userError = action.error.message;
        state.userStatus = "";
      })
      .addCase(deleteUserImage.pending, (state) => {
        state.userStatus = "deleting user image";
        state.userError = "";
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, image: action.payload.image };
        state.userStatus = "";
      })
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.userError = action.error.message;
        state.userStatus = "";
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.userStatus = "deleting user account";
        state.userError = "";
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.userInfo = "";
        state.userStatus = "Account deleted";
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.userError = action.error.message;
        state.userStatus = "";
      });
  },
});

// export const { reset } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
