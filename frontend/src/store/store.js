import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../store/userSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store;