import { createSlice } from '@reduxjs/toolkit';

type TableElement = {
  id: number;
  name: string;
  date: string;
  number: number;
  distance: number;
};

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
