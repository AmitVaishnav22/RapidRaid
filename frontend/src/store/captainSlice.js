import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email:'',
  fullname:'',
  vehicle:{
    color:'',
    plate:'',
    capacity:'',
    vehicleType:''
  }
};

const captainSlice = createSlice({
    name: "captain",
    initialState,
    reducers: {
    setCaptain(state, action) {
        return { ...state, ...action.payload };
      },
      clearUser() {
        return initialState;
      },
  }
})


export const { setCaptain, clearUser } = captainSlice.actions;
export default captainSlice.reducer;