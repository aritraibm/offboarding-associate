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
    finalDocumentTypeList: [{ "id": 1, "name": "Select" }, { "id": 2, "name": "BEEKEEPER FAKE" }, { "id": 3, "name": "Checkpoint Goals FAKE" }, { "id": 4, "name": "Day-1 - Non_Disclosure FAKE" }],
    invokeDocumentTypeSaga: [{ "id": 1, "name": "Select" }, { "id": 2, "name": "BEEKEEPER FAKE 2" }, { "id": 3, "name": "Checkpoint Goals FAKE 2" }, { "id": 4, "name": "Day-1 - Non_Disclosure FAKE 2" }]
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
    finalDocumentTypeList: (state, action) => {
      state.finalDocumentTypeList = action.payload;
    },
    invokeDocumentTypeSaga: (state, action) => {
      state = { ...state, ...action.payload.invokeDocumentTypeSaga };
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
  finalDocumentTypeList,
  invokeDocumentTypeSaga,
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
export const allDocumentTypes = (state) => state.finalDocumentTypeList;
export const allUpdateDocumentTypes = (state) => state.invokeDocumentTypeSaga;
export const { reducer } = slice;
