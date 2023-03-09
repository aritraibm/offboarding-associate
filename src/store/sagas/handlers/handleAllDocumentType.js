import { call, put } from "redux-saga/effects";
import { allUpdateDocumentTypes, updateDocumentTypes, documentTypes } from "../../reducers/app.reducer";
import { requestAllDocumentType } from "../requests/getAllDocumentType";

export function* handleAllDocumentType(action) {
  try {
    const response = yield call(requestAllDocumentType);
    const { data } = response;
    // console.log("API response is::::::::: >>>" + JSON.stringify(data))
    yield put(documentTypes({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
