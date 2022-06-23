import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableElement } from '../model/table';
import { GetTablePageSliceProps } from './type';

export interface TableState {
  table: TableElement[];
  pages: number;
}

const initialState: TableState = {
  table: [],
  pages: 0,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<TableElement[]>) => {
      state.table = action.payload;
    },
    getTablePage: (state, action: PayloadAction<GetTablePageSliceProps>) => {
      state.table = action.payload.table;
      state.pages = action.payload.pages;
    },
  },
});

export const { getAll, getTablePage } = tableSlice.actions;

export default tableSlice.reducer;
