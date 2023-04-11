import { ROLE_ASSOCIATE, ROLE_OFFBOARDING_REVIEWER, ROLE_OFFBOARDING_MANAGER } from '../helper/constants'

export type LoginRequest = {
    empId: string;
    password: string;
}

export type LoginResponse = {
    token?: any;
    data: {
        role: string,
        email: string,
        name: string,
        firstName: string,
        lastName: string,
        userId: string,
        associateName?: string,
        associateRole?: string,
        reviewerName?: string,
        reviewerRole?: string,
        managerName?: string,
        managerRole?: string,
        reviewer: {
            empId: string,
            reviewerName: string
        },
        manager: {
            empId: string,
            managerName: string
        },
        token: any
    }

}


export interface DropdownType {
    label: string;
    autoFocus?: boolean;
    name: string;
    renderValue?: any;
    error: any;
    onChange: any;
    helperText: any;
    options: Record<string, any>;
    selectAnOption: boolean;
}

export interface DropdownIdName {
    id: string;
    name: string;
}

export interface TextareaType {
    label: string;
    autoFocus?: boolean;
    name: string;
    error: any;
    helperText: any;
}

export interface DropdownValues {
    id: string;
    name: string;
}

export interface LabelVisibilityTestCaseType {
    attributeLabel: string;
    visibilityExpectation: boolean;
    testcaseName?: string;
}

export interface RegExTestCaseType {
    value: string;
    isMatch: boolean;
}

export interface AssociateDetailResponse {
    associateId: Number,
    associateName: String,
    ibmId: String,
    projectId: Number,
    engagementName: String,
    majorFunction: String,
    band: String,
    primaryContact: String,
    emailIbm: String,
    emailClient: String,
    xid: String,
    clientManager: String,
    endDate: String,
    location: String,
    city: String,
    billType: String,
    billCode: String,
    teamOrRole: String,
    role: String,
    asOnDate: String,
    clientExpDate: String,
    itExpDate: String,
    ibmDate: String,
    experienceWithClient: String,
    careerExperience: String,
    experienceWithIbm: String,
    skillset: String,
    resourceCriticality: String,
    atImmigrationVisaRisks: String,
    backupSuccessorResource: String,
    keyContingencyGroup: String,
    additionalContingency: String,
    visaType: String,
    workPermitValidUntil: String,
    extensionUpdates: String,
    visaMaxOutDate: String,
    timeLeftInUs: String,
    h1bNominations: String,
    riskMitigationComments: String,
    planInCaseOfExtensionAmendmentRejection: String,
    activeInactive: String
}

export interface NewUserInitialState {
    email: string,
    employeeId: string,
    reviewerName: string,
    managerName: string,
    role: string,
    firstName: string,
    lastName: string,
    password: string,
    showPassword: boolean,
    isLoginButonDisabled: boolean,
    isGeneratedButtonDisabled: boolean,
    error: UserInitiationErrorDetails,
}

export interface UserInitiationErrorDetails {
    errorEmail: boolean,
    errorEmployeeId: boolean,
    errorReviewerName: boolean,
    errorManagerName: boolean,
    errorRole: boolean,
    errorFirstName: boolean,
    errorLastName: boolean,
    errorPassword: boolean,
    errorGeneratebutton: boolean,
}

export interface MenuGeneratorProps {
    isTabActive?: string,
    label: string,
    linkTo: string,
    tabClicked?: string,
    state?: any,
}

type AllApplicationRoles = typeof ROLE_ASSOCIATE | typeof ROLE_OFFBOARDING_REVIEWER | typeof ROLE_OFFBOARDING_MANAGER;


export interface LoggedInUserDetails {
    name: string,
    role: AllApplicationRoles,
    reviewer: string,
    manager: string,
    empId: string
}

export interface GlobalStoreType {
    activeTab: string,
    token: string | null,
    userDetails: LoggedInUserDetails,
    comments: [],
    createNewUserDetailsData: NewUserInitialState,
    managers: [],
    reviewers: [],
    roles: [],
    recordings: [],
    invokeDocumentTypeSaga: [],
    finalDocumentTypeList: [],
    invokeAssociatesSaga: [],
    finalAssociatesList: [],
    invokeAllRoleSaga: [],
    finalRoleList: [],
    invokeAllManagerSaga: [],
    finalAllManagerList: [],
    invokeAllReviewerSaga: [],
    finalAllReviewerList: [],
}

export type AllRoleType = DropdownValues;

interface EmpId {
    empId: string
}
export interface AllManagerType extends EmpId {
    managerName: string
}

export interface AllReviewerType extends EmpId {
    reviewerName: string
}