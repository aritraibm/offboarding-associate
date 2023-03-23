import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { AllRoleType, AssociateDetailResponse, DropdownIdName, AllReviewerType, AllManagerType } from "../../../helper/type";
import { finalAllManagerList, finalAllReviewerList, finalAssociatesList, finalDocumentTypeList, finalRoleList } from "../../reducers/app.reducer";
import { requestAllDocumentType, requestAllAsociate, requestAllRoles, requestAllManagers, requestAllReviewers } from "../requests/httpRequestSaga";

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

export function* handleAllRoles(action: any) {
  try {
    const response: AxiosResponse<AllRoleType[]> = yield call(requestAllRoles);
    const { data } = response;
    yield put(finalRoleList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAllManagers(action: any) {
  try {
    const response: AxiosResponse<AllManagerType[]> = yield call(requestAllManagers);
    const { data } = response;
    yield put(finalAllManagerList(data));
  } catch (error) {
    console.log(error);
  }
}


export function* handleAllReviewers(action: any) {
  try {
    const response: AxiosResponse<AllReviewerType[]> = yield call(requestAllReviewers);
    const { data } = response;
    yield put(finalAllReviewerList(data));
  } catch (error) {
    console.log(error);
  }
}
