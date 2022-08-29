// import { configureStore } from "@reduxjs/toolkit"
// import { combineReducers } from "redux"

// export const store = configureStore({
//   // reducer: {},
// })

import { configureStore, createSlice } from "@reduxjs/toolkit"
const reducerSlice = createSlice({
  name: "store",
  initialState: {},
  reducers: {
    someAction: function () {},
  },
})
export const store = configureStore({
  reducer: {
    someReducer: reducerSlice.reducer,
  },
})
