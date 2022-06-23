import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';

const TablePage = () => {
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(() => {
    dispatch({ type: 'GET_TABLE_PAGE', payload: { page: 0, limit: 1 } });
  }, [dispatch]);

  return (
    <>
      <h1>Привет</h1>
      <button onClick={handleLoad}>Загрузить таблицу</button>
    </>
  );
};

export default TablePage;
