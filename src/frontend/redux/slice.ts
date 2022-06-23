import { createSlice } from '@reduxjs/toolkit';
import { TableElement } from '../model/table';

interface TableState {
  table: TableElement[];
}

// Define the initial state using that type
const initialState: TableState = {
  table: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
});

export const {} = tableSlice.actions;

export default tableSlice.reducer;
