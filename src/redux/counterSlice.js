import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
    subtract: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export const { increment, decrement, add, subtract } = counterSlice.actions;

export default counterSlice.reducer;
