import { call, put, takeLatest } from 'redux-saga/effects';
import TableDataService from '../api/table';
import * as tableActions from './slice';
import * as tableTypes from './type';

function* getFullTable() {
  try {
    const { data } = yield call(TableDataService.getAll);
    yield put(tableActions.getAll(data));
  } catch (e) {}
}

function* getTablePage({
  payload: { page, limit },
}: tableTypes.GetTablePageSagaProps) {
  try {
    const { data } = yield call(TableDataService.getPage, { page, limit });
    yield put(tableActions.getTablePage(data));
  } catch (e) {}
}

export default function* rootSaga() {
  yield takeLatest('GET_FULL_TABLE', getFullTable);
  yield takeLatest('GET_TABLE_PAGE', getTablePage);
}
