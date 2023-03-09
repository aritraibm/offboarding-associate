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
  name: 'count',
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
    // documentTypes: [1, 2, 3],
    documentTypes: [{ "id": 1, "name": "Select" }, { "id": 2, "name": "BEEKEEPER FAKE" }, { "id": 3, "name": "Checkpoint Goals FAKE" }, { "id": 4, "name": "Day-1 - Non_Disclosure FAKE" }],
    updateDocumentTypes: [{ "id": 1, "name": "Select" }, { "id": 2, "name": "BEEKEEPER FAKE 2" }, { "id": 3, "name": "Checkpoint Goals FAKE 2" }, { "id": 4, "name": "Day-1 - Non_Disclosure FAKE 2" }]
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
    documentTypes: (state, action) => {
      state.documentTypes = action.payload;
      console.log("FINAL state is: ::::>" + JSON.stringify(state))

    },
    updateDocumentTypes: (state, action) => {
      // console.log("state is: ::::>" + JSON.stringify(state))
      // console.log("action.payload.updateDocumentTypes is: ::::>" + JSON.stringify(action.payload.updateDocumentTypes))
      state = { ...state, ...action.payload.updateDocumentTypes };
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
  documentTypes,
  updateDocumentTypes,
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
export const allDocumentTypes = (state) => state.documentTypes;
export const allUpdateDocumentTypes = (state) => state.updateDocumentTypes;
export const { reducer } = slice;
