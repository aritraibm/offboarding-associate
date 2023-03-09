import { call, put } from "redux-saga/effects";
import { allUpdateDocumentTypes, invokeDocumentTypeSaga, finalDocumentTypeList } from "../../reducers/app.reducer";
import { requestAllDocumentType } from "../requests/getAllDocumentType";

export function* handleAllDocumentType(action) {
  try {
    const response = yield call(requestAllDocumentType);
    const { data } = response;
    //console.log("API response is::::::::: >>>" + JSON.stringify(data))
    yield put(finalDocumentTypeList(data));
  } catch (error) {
    console.log(error);
  }
}
