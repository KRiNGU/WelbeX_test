import mainAxios from './api';

export interface GetPageProps {
  page: number;
  limit: number;
  filter: string | undefined;
  action: string | undefined;
  value: string | undefined;
}

export interface CreateElementProps {
  name: string;
  date: string;
  number: number;
  distance: number;
}

// Класс общения с сервером
class TableDataService {
  async getAll() {
    return mainAxios.get('/elements');
  }

  async getPage({ page, limit, filter, action, value }: GetPageProps) {
    return mainAxios.get(
      `/elements?page=${page}&limit=${limit}` +
        (filter && action && value
          ? `&filter=${filter}&action=${action}&value=${value}`
          : '')
    );
  }

  async createElement({ name, date, number, distance }: CreateElementProps) {
    return mainAxios.post(`/elements`, { name, date, number, distance });
  }
}

export default new TableDataService();
