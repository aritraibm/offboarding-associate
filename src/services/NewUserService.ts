import axios from "axios";
import { ROLE_ASSOCIATE } from "../helper/constants";

const BASE_URL = 'http://localhost:9099/';

const getRandomInt = (min: any, max: any) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

export const saveNewUser = (requestData: any, userToken: string) => {
    return axios.post(`${BASE_URL}user_add`, requestData)
        .then((response) => {
            console.log("response is ::::: >>>>" + JSON.stringify(response));
            // setSnakBarOpen(true);

            if (response.data.role.name === ROLE_ASSOCIATE) {
                const saveAssociateReq = {
                    // associateName: response.data.userName,
                    // ibmId: response.data.employeeId,
                    // emailIbm: response.data.email,
                    // FristName: response.data.FristName,
                    // LastName: response.data.LastName,
                    // activeInactive: 'Yet to be started',

                    associate: {
                        associateId: getRandomInt(100, 1000),
                        associateName: response.data.firstName + " " + response.data.lastName,
                        ibmId: response.data.employeeId,
                        projectId:5,
                        engagementName:"engagementName",
                        majorFunction:"majorFunction",
                        band:"06G",
                        primaryContact:"primaryContact",
                        emailIbm:"associate2@ibm.com",
                        emailClient:"associate2@prudential.com",
                        xid: "x222222",
                        clientManager: "DemoClientManager",
                        endDate:"2024-07-22",
                        location:"India",
                        city:"Bangalore",
                        billType:"billType",
                        billCode:"billCode",
                        teamOrRole:"teamOrRole",
                        role:"Software Developer",
                        asOnDate: "2022-07-22",
                        clientExpDate: "2024-07-22",
                        ibmDate:"2022-07-22",
                        experienceWithClient:"experienceWithClient",
                        careerExperience:"careerExperience",
                        experienceWithIbm:"experienceWithIbm",
                        skillset:"skillset",
                        resourceCriticality:"resourceCriticality",
                        atImmigrationVisaRisks:"atImmigrationVisaRisks",
                        backupSuccessorResource: 1,
                        keyContingencyGroup: "keyContingencyGroup",
                        additionalContingency:"additionalContingency",
                        visaType:"visaType",
                        workPermitValidUntil:"workPermitValidUntil",
                        extensionUpdates:"extensionUpdates",
                        visaMaxOutDate:"2022-07-22",
                        timeLeftInUs:"timeLeftInUs",
                        h1bNominations:"h1bNominations",
                        riskMitigationComments:"riskMitigationComments",
                        planInCaseOfExtensionAmendmentRejection:"planInCaseOfExtensionAmendmentRejection",
                        activeInactive:"Active"
                    },
                    associateSkill:[
                        {
                        associateSkillId:2,
                        associateId:10,
                        skillId:3,
                        skillRating:"skillRating"
                        }
                    ]
                };
                const associateResponse = axios.post(
                    'http://localhost:9092/pru-associate/save-associate',
                    saveAssociateReq,
                    {
                        headers: { Authorization: 'Bearer ' + userToken },
                    }
                );
                console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
            }
            // setSnackbarOpen(true);
            // dispatch(resetCreateNewUserDetails());
        });
}

class NewUserService {

    // saveNewUser = (requestData: any, userToken: string) => {
    //     return axios.post(`${BASE_URL}user_add`, requestData)
    //         .then((response) => {
    //             console.log("response is ::::: >>>>" + JSON.stringify(response));
    //             // setSnakBarOpen(true);

    //             if (response.data.role.name === ROLE_ASSOCIATE) {
    //                 const saveAssociateReq = {
    //                     associateName: response.data.userName,
    //                     ibmId: response.data.employeeId,
    //                     emailIbm: response.data.email,
    //                     FristName: response.data.FristName,
    //                     LastName: response.data.LastName,
    //                     activeInactive: 'Yet to be started',
    //                 };
    //                 const associateResponse = axios.post(
    //                     'http://localhost:9092/pru-associate/save-associate',
    //                     saveAssociateReq,
    //                     {
    //                         headers: { Authorization: 'Bearer ' + userToken },
    //                     }
    //                 );
    //                 console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
    //             }
    //             // setSnackbarOpen(true);
    //             // dispatch(resetCreateNewUserDetails());
    //         });
    // }

    // getRecordings() {
    //     return axios.get(BASE_URL + '/get-all-recordings');
    // }

    // createRecording(recording, headers) {
    //     return axios.post(BASE_URL + '/add-recording', recording, {
    //         headers: headers,
    //     });
    // }

    // getRecordingById(recordingId) {
    //     return axios.get(BASE_URL + '/' + recordingId);
    // }

    // updateRecording(recording, recordingId, headers) {
    //     return axios.put(BASE_URL + '/' + recordingId, recording, {
    //         headers: headers,
    //     });
    // }

    // deleteRecording(recordingId, headers) {
    //     return axios.delete(BASE_URL + '/' + recordingId, {
    //         headers: headers,
    //     });
    // }
}

export default new NewUserService();
