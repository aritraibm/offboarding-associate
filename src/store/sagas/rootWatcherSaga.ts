import { takeLatest } from 'redux-saga/effects'
import { invokeAssociatesSaga, invokeDocumentTypeSaga, invokeAllRoleSaga, invokeAllManagerSaga, invokeAllReviewerSaga } from '../reducers'
import { handleAllDocumentType, handleAllAssociate, handleAllRoles, handleAllManagers, handleAllReviewers } from "./handlers/handlerSaga";

export function* watcherSaga() {

    console.log("invokeDocumentTypeSaga.type :::::::: >>>>>>" + invokeDocumentTypeSaga.type)
    console.log("invokeAssociatesSaga.type :::::::: >>>>>>" + invokeAssociatesSaga.type)
    console.log("invokeAllRoleSaga.type :::::::: >>>>>>" + invokeAllRoleSaga.type)
    console.log("invokeAllReviewerSaga.type :::::::: >>>>>>" + invokeAllReviewerSaga.type)
    console.log("invokeAllManagerSaga.type :::::::: >>>>>>" + invokeAllManagerSaga.type)

    if (invokeDocumentTypeSaga.type === 'Offboarding/invokeDocumentTypeSaga') {
        yield takeLatest(invokeDocumentTypeSaga.type, handleAllDocumentType);

    }
    if (invokeAssociatesSaga.type === 'Offboarding/invokeAssociatesSaga') {
        yield takeLatest(invokeAssociatesSaga.type, handleAllAssociate);

    }
    if (invokeAllRoleSaga.type === 'Offboarding/invokeAllRoleSaga') {
        yield takeLatest(invokeAllRoleSaga.type, handleAllRoles);

    }
    if (invokeAllManagerSaga.type === 'Offboarding/invokeAllManagerSaga') {
        yield takeLatest(invokeAllManagerSaga.type, handleAllManagers);

    }
    if (invokeAllReviewerSaga.type === 'Offboarding/invokeAllReviewerSaga') {
        yield takeLatest(invokeAllReviewerSaga.type, handleAllReviewers);

    }
}