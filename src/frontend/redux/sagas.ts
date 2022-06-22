import { takeLatest } from 'redux-saga/effects';

function* getTablePage() {
  console.log('getTablePage');
}

export default function* rootSaga() {
  yield takeLatest('GET_TABLE_ELEMENTS_BY_PAGE', getTablePage);
}
