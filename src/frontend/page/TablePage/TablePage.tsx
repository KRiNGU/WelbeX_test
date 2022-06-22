import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';

const TablePage = () => {
  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    dispatch({ type: 'GET_TABLE_ELEMENTS_BY_PAGE' });
  }, [dispatch]);

  return (
    <>
      <h1>Привет</h1>
      <button onClick={handleButtonClick}>Клик</button>
    </>
  );
};

export default TablePage;
