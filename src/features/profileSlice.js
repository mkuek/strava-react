import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile_data_raw } from "./data/profileData_raw";
// const getAccessToken = () => {
//   const headers = {
//     Accept: "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//   };

//   const body = JSON.stringify({
//     client_id: process.env.STRAVA_CLIENT_ID,
//     client_secret: process.env.STRAVA_SECRET,
//     refresh_token: process.env.STRAVA_REFRESH_TOKEN,
//     grant_type: "refresh_token",
//   });

//   const reauthToken = await fetch("https://www.strava.com/oauth/token", {
//     method: "post",
//     headers,
//     body,
//   });

//   const { access_token } = await reauthToken.json()
//   return access_token
// }

export const getProfileData = createAsyncThunk(
  "data/getProfileData",
  async () => {
    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete?access_token=3819e8601574e55e59888263e78cce6b7186ae89`
    );
    return res.data;
  }
);

const initialState = {
  profile: profile_data_raw[0],
  status: "idle",
  error: null,
};

export const profileSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfileData.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [getProfileData.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [getProfileData.rejected]: (state) => {
      state.status = "error";
      state.error = true;
    },
  },
});

export default profileSlice.reducer;
export const profileData = (state) => state.profile;
