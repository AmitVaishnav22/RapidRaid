import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email:'',
  fullname:''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    setUser(state, action) {
        return { ...state, ...action.payload };
      },
      clearUser() {
        return initialState;
      },
  }
})


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;