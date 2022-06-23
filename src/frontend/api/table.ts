import mainAxios from './api';

export interface GetPageProps {
  page: number;
  limit: number;
}

class TableDataService {
  async getAll() {
    return mainAxios.get('/elements');
  }

  async getPage({ page, limit }: GetPageProps) {
    return mainAxios.get(`/element?page=${page}&limit=${limit}`);
  }
}

export default new TableDataService();
