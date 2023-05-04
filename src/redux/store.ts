import { configureStore } from "@reduxjs/toolkit";

import { personageSlice } from "./slices/personageSlice";

export const store = configureStore({
  reducer: {
    personage: personageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
