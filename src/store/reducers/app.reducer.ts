import { createSlice } from '@reduxjs/toolkit';
import { AllRoleType, AssociateDetailResponse, DropdownIdName, GlobalStoreType, NewUserInitialState } from "../../helper/type";
import { DEFAULT_TAB } from '../../helper/constants';

const newUserInitState: NewUserInitialState = {
  email: '',
  employeeId: '',
  reviewerName: '',
  managerName: '',
  role: '',
  userName: '',
  password: '',
  showPassword: false,
  isLoginButonDisabled: false,
  isGeneratedButtonDisabled: false,
  error: {
    errorEmail: false,
    errorEmployeeId: false,
    errorReviewerName: false,
    errorManagerName: false,
    errorRole: false,
    errorUserName: false,
    errorPassword: false,
    errorGeneratebutton: false,
  },
};

const slice = createSlice({
  name: 'Offboarding',
  initialState: {
    activeTab: DEFAULT_TAB,
    token: null,
    userDetails: null,
    comments: [],
    createNewUserDetailsData: newUserInitState,
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
  },
  reducers: {
    tabSelected: (state: any, action) => {
      state.activeTab = action.payload.tab;
    },
    createNewUserDetails: (state: any, action) => {
      state.createNewUserDetailsData = action.payload.createNewUser;
    },
    login: (state: any, action) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state: any) => {
      state.token = null;
      state.userDetails = null;
      state.comments = [];
    },
    comments: (state: any, action) => {
      state.comments = action.payload.comments;
    },
    resetCreateNewUserDetails: (state: any) => {
      state.createNewUserDetailsData = newUserInitState;
    },
    roles: (state: any, action) => {
      state.roles = action.payload.roles;
    },
    managers: (state: any, action) => {
      state.managers = action.payload.managers;
    },
    reviewers: (state: any, action) => {
      state.reviewers = action.payload.reviewers;
    },
    // associateList: (state, action) => {
    //   state.associateList = action.payload.associateList;
    // },
    recordings: (state: any, action) => {
      state.recordings = action.payload.recordings;
    },
    invokeDocumentTypeSaga: (state: any, action) => {
      state = { ...state, ...action.payload.invokeDocumentTypeSaga };
    },
    finalDocumentTypeList: (state: any, action) => {
      state.finalDocumentTypeList = action.payload;
    },
    invokeAssociatesSaga: (state: any, action) => {
      state = { ...state, ...action.payload.invokeAssociatesSaga };
    },
    finalAssociatesList: (state: any, action) => {
      state.finalAssociatesList = action.payload;
    },
    invokeAllRoleSaga: (state: any, action) => {
      state = { ...state, ...action.payload.invokeAllRoleSaga };
    },
    finalRoleList: (state: any, action) => {
      state.finalRoleList = action.payload;
    },
  },
});

export const appStore = (state: GlobalStoreType) => state;
export const {
  tabSelected,
  login,
  logout,
  comments,
  createNewUserDetails,
  resetCreateNewUserDetails,
  managers,
  reviewers,
  roles,
  //associateList,
  recordings,
  invokeDocumentTypeSaga,
  finalDocumentTypeList,
  invokeAssociatesSaga,
  finalAssociatesList,
  invokeAllRoleSaga,
  finalRoleList
} = slice.actions;
export const selectedTab = (state: { activeTab: string; }) => state.activeTab;
export const userDetails = (state: { userDetails: any; }) => state.userDetails;
// export const associates = (state: { associateList: any; }) => state.associateList;
export const token = (state: { token: string; }) => state.token;
export const userComments = (state: { comments: any; }) => state.comments;
export const createNewUser = (state: { createNewUserDetailsData: any; }) => state.createNewUserDetailsData;
// export const allRoles = (state: { roles: any; }) => state.roles;
export const allManagers = (state: { managers: any; }) => state.managers;
export const allReviewers = (state: { reviewers: any; }) => state.reviewers;
export const allRecordings = (state: { recordings: any; }) => state.recordings;
// export const allUpdateDocumentTypes = (state: { invokeDocumentTypeSaga: any; }) => state.invokeDocumentTypeSaga;
export const allDocumentTypes = (state: { finalDocumentTypeList: any; }) => state.finalDocumentTypeList;
// export const allUpdateAssociates = (state: { invokeAssociatesSaga: any; }) => state.invokeAssociatesSaga;
export const allAssociates = (state: { finalAssociatesList: any; }) => state.finalAssociatesList;
// export const invokeUpdateRoleSaga = (state: { invokeAllRoleSaga: any; }) => state.invokeAllRoleSaga;
export const allRoles = (state: { finalRoleList: AllRoleType[]; }) => state.finalRoleList;
export const { reducer } = slice;
