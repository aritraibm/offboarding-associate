import { takeLatest } from 'redux-saga/effects'
import { invokeAssociatesSaga, invokeDocumentTypeSaga, invokeAllRoleSaga } from '../reducers'
import { handleAllDocumentType, handleAllAssociate, handleAllRoles } from "./handlers/handlerSaga";

export function* watcherSaga() {

    console.log("invokeDocumentTypeSaga.type :::::::: >>>>>>" + invokeDocumentTypeSaga.type)
    console.log("invokeAssociatesSaga.type :::::::: >>>>>>" + invokeAssociatesSaga.type)
    console.log("invokeAllRoleSaga.type :::::::: >>>>>>" + invokeAllRoleSaga.type)

    if (invokeDocumentTypeSaga.type === 'Offboarding/invokeDocumentTypeSaga') {
        yield takeLatest(invokeDocumentTypeSaga.type, handleAllDocumentType);

    }
    if (invokeAssociatesSaga.type === 'Offboarding/invokeAssociatesSaga') {
        yield takeLatest(invokeAssociatesSaga.type, handleAllAssociate);

    }
    if (invokeAllRoleSaga.type === 'Offboarding/invokeAllRoleSaga') {
        yield takeLatest(invokeAllRoleSaga.type, handleAllRoles);

    }
}