import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "./store";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    power: (state, action: PayloadAction<number>) => {
      state.value = Math.pow(state.value, action.payload);
    },
    multiply: (state, action: PayloadAction<number>) => {
      state.value *= action.payload;
    },
    divide: (state, action: PayloadAction<number>) => {
      state.value /= action.payload;
    },
    clear: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, power, multiply, divide, clear } =
  counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
