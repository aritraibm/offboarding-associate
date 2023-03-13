import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { AssociateDetailResponse, DropdownIdName } from "../../../helper/type";
import { finalAssociatesList, finalDocumentTypeList } from "../../reducers/app.reducer";
import { requestAllDocumentType, requestAllAsociate } from "../requests/httpRequestSaga";

export function* handleAllDocumentType(action: any) {
  try {
    const response: AxiosResponse<DropdownIdName[]> = yield call(requestAllDocumentType);
    const { data } = response;
    yield put(finalDocumentTypeList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAllAssociate(action: any) {
  try {
    const response: AxiosResponse<AssociateDetailResponse[]> = yield call(requestAllAsociate);
    const { data } = response;
    yield put(finalAssociatesList(data));
  } catch (error) {
    console.log(error);
  }
}
