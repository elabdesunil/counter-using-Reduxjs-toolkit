import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: "result",
  initialState: {
    results: [],
  },
  reducers: {
    updateResult: (state, action) => {
      const d = new Date();
      state.results.push({ id: d.valueOf(), value: action.payload });
    },
    deleteResult: (state, action) => {
      state.results = state.results.filter(
        (result) => result.id !== action.payload
      );
    },
  },
});

export const { updateResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
