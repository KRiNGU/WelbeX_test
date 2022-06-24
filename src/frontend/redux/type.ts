import { TableElement } from '../model/table';

interface TypeWithPayload {
  type: string;
  payload: object;
}

export interface GetTablePageSagaProps extends TypeWithPayload {
  payload: {
    page: number;
    limit: number;
    filter: string | undefined;
    action: string | undefined;
    value: string | undefined;
  };
}

export interface CreateElementSagaProps extends TypeWithPayload {
  payload: {
    name: string;
    date: string;
    number: number;
    distance: number;
  };
}

export interface GetTablePageSliceProps {
  table: TableElement[];
  pages: number;
}
