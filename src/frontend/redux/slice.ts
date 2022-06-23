import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableElement } from '../model/table';

interface TableState {
  table: TableElement[];
}

const initialState: TableState = {
  table: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<TableElement[]>) => {
      state.table = action.payload;
    },
  },
});

export const { getAll } = tableSlice.actions;

export default tableSlice.reducer;
