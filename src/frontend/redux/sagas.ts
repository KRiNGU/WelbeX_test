import { call, put, takeLatest } from 'redux-saga/effects';
import TableDataService from '../api/table';
import * as tableActions from './slice';

function* getFullTable() {
  try {
    const { data } = yield call(TableDataService.getAll);
    yield put(tableActions.getAll(data));
  } catch (e) {}
}

function* getTablePage() {
  console.log('getTablePage');
}

export default function* rootSaga() {
  yield takeLatest('GET_FULL_TABLE', getFullTable);
  yield takeLatest('GET_TABLE_ELEMENTS_BY_PAGE', getTablePage);
}
