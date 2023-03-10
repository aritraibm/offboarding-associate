import { createSlice } from '@reduxjs/toolkit';

const newUserInitState = {
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
    activeTab: 'Default',
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
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
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
    associateList: (state, action) => {
      state.associateList = action.payload.associateList;
    },
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

export const appStore = (state) => state;
export const {
  increment,
  decrement,
  tabSelected,
  login,
  logout,
  comments,
  createNewUserDetails,
  resetCreateNewUserDetails,
  managers,
  reviewers,
  roles,
  associateList,
  recordings,
  invokeDocumentTypeSaga,
  finalDocumentTypeList,
  invokeAssociatesSaga,
  finalAssociatesList
} = slice.actions;
export const selectedTab = (state) => state.activeTab;
export const userDetails = (state) => state.userDetails;
export const associates = (state) => state.associateList;
export const token = (state) => state.token;
export const userComments = (state) => state.comments;
export const createNewUser = (state) => state.createNewUserDetailsData;
export const allRoles = (state) => state.roles;
export const allManagers = (state) => state.managers;
export const allReviewers = (state) => state.reviewers;
export const allRecordings = (state) => state.recordings;
export const allUpdateDocumentTypes = (state) => state.invokeDocumentTypeSaga;
export const allDocumentTypes = (state) => state.finalDocumentTypeList;
export const allUpdateAssociates = (state) => state.invokeAssociatesSaga;
export const allAssociates = (state) => state.finalAssociatesList;
export const { reducer } = slice;
