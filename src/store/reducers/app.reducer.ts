import { createSlice } from '@reduxjs/toolkit';
import { AssociateDetailResponse, DropdownIdName, NewUserInitialState } from "../../components/constants/type";
import { DEFAULT_TAB } from '../../components/constants/UIConstants';

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
    count: 0,
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
  },
  reducers: {
    tabSelected: (state, action) => {
      state.activeTab = action.payload.tab;
    },
    createNewUserDetails: (state, action) => {
      state.createNewUserDetailsData = action.payload.createNewUser;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.token = null;
      state.userDetails = null;
      state.comments = [];
    },
    comments: (state, action) => {
      state.comments = action.payload.comments;
    },
    resetCreateNewUserDetails: (state) => {
      state.createNewUserDetailsData = newUserInitState;
    },
    roles: (state, action) => {
      state.roles = action.payload.roles;
    },
    managers: (state, action) => {
      state.managers = action.payload.managers;
    },
    reviewers: (state, action) => {
      state.reviewers = action.payload.reviewers;
    },
    // associateList: (state, action) => {
    //   state.associateList = action.payload.associateList;
    // },
    recordings: (state, action) => {
      state.recordings = action.payload.recordings;
    },
    invokeDocumentTypeSaga: (state, action) => {
      state = { ...state, ...action.payload.invokeDocumentTypeSaga };
    },
    finalDocumentTypeList: (state, action) => {
      state.finalDocumentTypeList = action.payload;
    },
    invokeAssociatesSaga: (state, action) => {
      state = { ...state, ...action.payload.invokeAssociatesSaga };
    },
    finalAssociatesList: (state, action) => {
      state.finalAssociatesList = action.payload;
    },
  },
});

export const appStore = (state: any) => state;
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
  finalAssociatesList
} = slice.actions;
export const selectedTab = (state: { activeTab: string; }) => state.activeTab;
export const userDetails = (state: { userDetails: any; }) => state.userDetails;
// export const associates = (state: { associateList: any; }) => state.associateList;
export const token = (state: { token: string; }) => state.token;
export const userComments = (state: { comments: any; }) => state.comments;
export const createNewUser = (state: { createNewUserDetailsData: any; }) => state.createNewUserDetailsData;
export const allRoles = (state: { roles: any; }) => state.roles;
export const allManagers = (state: { managers: any; }) => state.managers;
export const allReviewers = (state: { reviewers: any; }) => state.reviewers;
export const allRecordings = (state: { recordings: any; }) => state.recordings;
export const allUpdateDocumentTypes = (state: { invokeDocumentTypeSaga: any; }) => state.invokeDocumentTypeSaga;
export const allDocumentTypes = (state: { finalDocumentTypeList: any; }) => state.finalDocumentTypeList;
export const allUpdateAssociates = (state: { invokeAssociatesSaga: any; }) => state.invokeAssociatesSaga;
export const allAssociates = (state: { finalAssociatesList: any; }) => state.finalAssociatesList;
export const { reducer } = slice;
