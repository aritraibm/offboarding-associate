import { takeLatest } from 'redux-saga/effects'
import { finalDocumentTypeList, invokeDocumentTypeSaga } from '../reducers'
import { handleAllDocumentType } from "./handlers/handleAllDocumentType";

export function* watcherSaga() {
    console.log("invokeDocumentTypeSaga.type :::::::: >>>>>>" + invokeDocumentTypeSaga.type)

    switch (invokeDocumentTypeSaga.type) {
        case 'Offboarding/invokeDocumentTypeSaga':
            yield takeLatest(invokeDocumentTypeSaga.type, handleAllDocumentType);
        default:
            console.log(":::::::::::: NO WATCHER SAGA DEFINED ::::::::::::")
    }

}