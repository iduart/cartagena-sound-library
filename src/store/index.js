import { configureStore } from '@reduxjs/toolkit';
import globalSearch from './globalSearch';

const rootReducer = {
  globalSearch: globalSearch.reducer
}

export default configureStore({
  reducer: rootReducer,
});