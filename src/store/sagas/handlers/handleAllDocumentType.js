import { call, put } from "redux-saga/effects";
import { finalAssociatesList, finalDocumentTypeList } from "../../reducers/app.reducer";
import { requestAllDocumentType, requestAllAsociate } from "../requests/getAllDocumentType";

export function* handleAllDocumentType(action) {
  try {
    const response = yield call(requestAllDocumentType);
    const { data } = response;
    yield put(finalDocumentTypeList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAllAssociate(action) {
  try {
    const response = yield call(requestAllAsociate);
    const { data } = response;
    yield put(finalAssociatesList(data));
  } catch (error) {
    console.log(error);
  }
}
