import mainAxios from './api';

class TableDataService {
  async getAll() {
    return mainAxios.get('/elements');
  }
}

export default new TableDataService();
