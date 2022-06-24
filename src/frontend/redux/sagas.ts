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
  payload: { page, limit, filter, action, value },
}: tableTypes.GetTablePageSagaProps) {
  try {
    const { data } = yield call(TableDataService.getPage, {
      page,
      limit,
      filter,
      action,
      value,
    });
    yield put(tableActions.getTablePage(data));
  } catch (e) {}
}

function* createElement({
  payload: { name, date, number, distance },
}: tableTypes.CreateElementSagaProps) {
  try {
    yield call(TableDataService.createElement, {
      name,
      date,
      number,
      distance,
    });
  } catch (e) {}
}

export default function* rootSaga() {
  yield takeLatest('GET_FULL_TABLE', getFullTable);
  yield takeLatest('GET_TABLE_PAGE', getTablePage);
  yield takeLatest('CREATE_TABLE_ELEMENT', createElement);
}
