import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';

const TablePage = () => {
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(() => {
    dispatch({ type: 'GET_FULL_TABLE' });
  }, [dispatch]);

  return (
    <>
      <h1>Привет</h1>
      <button onClick={handleLoad}>Загрузить таблицу</button>
    </>
  );
};

export default TablePage;
