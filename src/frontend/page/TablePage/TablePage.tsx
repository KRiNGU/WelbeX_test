import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateNewTableElementModal from '../../components/CreateNewTableElementModal';
import { SubmitProps } from '../../components/CreateNewTableElementModal/CreateNewTableElementModal';
import { useAppDispatch } from '../../redux/hooks';
import { TableState } from '../../redux/slice';
import styles from './TablePage.module.scss';

const limits = [5, 10, 15, 20, 25, 30];

const TablePage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [filterField, setFilterField] = useState<string>('');
  const [filterAction, setFilterAction] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [isCreateModalOpened, setIsCreateModalOpened] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'GET_TABLE_PAGE',
      payload: {
        page: page - 1,
        limit,
        filter: filterField,
        action: filterAction,
        value: filterValue,
      },
    });
  }, [dispatch, page, limit, filterField, filterAction, filterValue]);

  const { table: tableElements, pages }: TableState = useSelector<
    TableState,
    TableState
  >((state) => state);

  const handleFirstPageButton = useCallback(() => {
    setPage(1);
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

  const handleSetFilterField = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (filterAction === 'inc') {
        setFilterAction('');
      }
      setFilterValue('');
      setFilterField(e.target.value);
    },
    [filterAction]
  );

  const handleSetFilterAction = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setFilterValue('');
      setFilterAction(e.target.value);
    },
    []
  );

  const handleChangeFilterValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (filterField === 'number' || filterField === 'distance') {
        if (e.target.value[e.target.value.length - 1]?.match(/[0-9]/)) {
          setFilterValue(e.target.value);
        } else if (!e.target.value) {
          setFilterValue('');
        }
      } else {
        if (e.target.value[e.target.value.length - 1]?.match(/[a-zA-Z0-9]/)) {
          setFilterValue(e.target.value);
        } else if (!e.target.value) {
          setFilterValue('');
        }
      }
    },
    [filterField]
  );

  const handleCreateNewElement = useCallback(
    ({ name, date, number, distance }: SubmitProps) => {
      dispatch({
        type: 'CREATE_TABLE_ELEMENT',
        payload: { name, date, number, distance },
      });
      setIsCreateModalOpened(false);
    },
    [dispatch]
  );

  return (
    <main className={styles.container}>
      <h1>Таблица</h1>
      <div className={styles.filterPannel}>
        <select
          className={styles.filterPannelElement}
          value={filterField}
          onChange={handleSetFilterField}
        >
          <option value="">Не выбрано</option>
          <option value="name">Название</option>
          <option value="number">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
        <select
          className={styles.filterPannelElement}
          value={filterAction}
          onChange={handleSetFilterAction}
        >
          <option value="">Не выбрано</option>
          <option value="eq">Равно</option>
          <option
            value="inc"
            disabled={filterField === 'number' || filterField === 'distance'}
          >
            Включает
          </option>
          <option value="lt">Меньше</option>
          <option value="gt">Больше</option>
        </select>
        <input
          value={filterValue}
          onChange={handleChangeFilterValue}
          className={styles.filterPannelElement}
          type="text"
        />
      </div>
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
      </table>
      <div className={styles.tableControlPannel}>
        <button
          className={styles.tableControlButton}
          disabled={page === 1}
          onClick={handleFirstPageButton}
        >
          {'<<'}
        </button>
        <button
          className={styles.tableControlButton}
          disabled={page === 1 || pages === 0}
          onClick={handlePrevPageButton}
        >
          {'<'}
        </button>
        <button
          className={styles.tableControlButton}
          disabled={page >= pages}
          onClick={handleNextPageButton}
        >
          {'>'}
        </button>
        <button
          className={styles.tableControlButton}
          disabled={page >= pages}
          onClick={handleLastPageButton}
        >
          {'>>'}
        </button>
        <select
          className={styles.tableControlButton}
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
        <button
          className={styles.tableControlButton}
          onClick={() => setIsCreateModalOpened(true)}
        >
          {'+'}
        </button>
      </div>
      {isCreateModalOpened && (
        <CreateNewTableElementModal
          onSubmit={handleCreateNewElement}
          onClose={() => setIsCreateModalOpened(false)}
        />
      )}
    </main>
  );
};

export default TablePage;
