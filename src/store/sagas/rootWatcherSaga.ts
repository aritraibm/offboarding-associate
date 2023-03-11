import { takeLatest } from 'redux-saga/effects'
import { invokeAssociatesSaga, invokeDocumentTypeSaga } from '../reducers'
import { handleAllDocumentType, handleAllAssociate } from "./handlers/handlerSaga";

export function* watcherSaga() {

    console.log("invokeDocumentTypeSaga.type :::::::: >>>>>>" + invokeDocumentTypeSaga.type)
    console.log("invokeAssociatesSaga.type :::::::: >>>>>>" + invokeAssociatesSaga.type)

    if (invokeDocumentTypeSaga.type === 'Offboarding/invokeDocumentTypeSaga') {
        yield takeLatest(invokeDocumentTypeSaga.type, handleAllDocumentType);

    }
    if (invokeAssociatesSaga.type === 'Offboarding/invokeAssociatesSaga') {
        yield takeLatest(invokeAssociatesSaga.type, handleAllAssociate);

    }
}