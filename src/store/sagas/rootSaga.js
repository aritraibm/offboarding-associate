import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { documentTypes, updateDocumentTypes } from '../reducers'
import { handleAllDocumentType } from "./handlers/handleAllDocumentType";

export function* watcherSaga() {
    yield takeLatest(updateDocumentTypes.type, handleAllDocumentType);
}