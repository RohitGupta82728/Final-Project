import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../redux/authReducer';


export const store = configureStore({
  reducer: {
    user:authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
