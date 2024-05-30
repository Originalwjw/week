import { configureStore } from '@reduxjs/toolkit'
import langReducer from './modules/lang'
const store = configureStore({
  reducer: {
    lang:langReducer
  },
})

export type LangState = ReturnType<typeof store.getState>;
export type LangDispatch = typeof store.dispatch;
export default store