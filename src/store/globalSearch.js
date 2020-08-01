import { createSlice } from '@reduxjs/toolkit';

const globalSearch = createSlice({
  name: 'globalSearch',
  initialState: '',
  reducers: {
    setSearch: (_, { payload }) => payload
  },
});

export const globalSearchSelectors = {
  getSearchText: (state) => state.globalSearch,
}

export default globalSearch;