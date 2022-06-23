import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { TableState } from '../../redux/slice';
import styles from './TablePage.module.scss';

const limits = [5, 10, 15, 20, 25, 30];

const TablePage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  useEffect(() => {
    dispatch({ type: 'GET_TABLE_PAGE', payload: { page: page - 1, limit } });
  }, [dispatch, page, limit]);
  const { table: tableElements, pages }: TableState = useSelector<
    TableState,
    TableState
  >((state) => state);

  const handleFirstPageButton = useCallback(() => {
    setPage(0);
  }, []);

  const handlePrevPageButton = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const handleNextPageButton = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleLastPageButton = useCallback(() => {
    setPage(pages);
  }, [pages]);

  const handleSetLimit = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  }, []);

  if (!tableElements.length) {
    return <></>;
  }

  return (
    <main className={styles.container}>
      <h1>Привет</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <td className={styles.tableElement}>{'Дата'}</td>
            <td className={styles.tableElement}>{'Название'}</td>
            <td className={styles.tableElement}>{'Количество'}</td>
            <td className={styles.tableElement}>{'Расстояние'}</td>
          </tr>
        </thead>
        <tbody>
          {tableElements.map((tableElement) => (
            <tr className={styles.tableLine} key={tableElement.id}>
              <td className={styles.tableElement}>
                {tableElement.date.match(/[0-9]+-[0-9]+-[0-9]+/)}
              </td>
              <td className={styles.tableElement}>{tableElement.name}</td>
              <td className={styles.tableElement}>{tableElement.number}</td>
              <td className={styles.tableElement}>{tableElement.distance}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={styles.tableControlPannel}>
            <td className={styles.tableControlButton}>
              <button disabled={page === 1} onClick={handleFirstPageButton}>
                {'<<'}
              </button>
            </td>
            <td className={styles.tableControlButton}>
              <button disabled={page === 1} onClick={handlePrevPageButton}>
                {'<'}
              </button>
            </td>
            <td className={styles.tableControlButton}>
              <button disabled={page >= pages} onClick={handleNextPageButton}>
                {'>'}
              </button>
            </td>
            <td className={styles.tableControlButton}>
              <button disabled={page >= pages} onClick={handleLastPageButton}>
                {'>>'}
              </button>
            </td>
            <td className={styles.tableControlButton}>
              <select
                onChange={handleSetLimit}
                name="selectLimit"
                id="selectLimit"
              >
                {limits.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
};

export default TablePage;
