import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';

const TablePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_TABLE_ELEMENTS_BY_PAGE' });
  }, [dispatch]);

  return (
    <>
      <h1>Привет</h1>
    </>
  );
};

export default TablePage;
