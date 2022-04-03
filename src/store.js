import { configureStore } from '@reduxjs/toolkit'
import DataReducer from './slices/Data';
const reducer = {
  dataLists: DataReducer,
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;