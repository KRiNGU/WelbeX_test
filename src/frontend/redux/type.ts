import { TableElement } from '../model/table';

export interface GetTablePageSagaProps {
  type: string;
  payload: {
    page: number;
    limit: number;
  };
}

export interface GetTablePageSliceProps {
  table: TableElement[];
  pages: number;
}
