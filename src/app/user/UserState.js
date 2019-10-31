const initialUserState = {
  currentUser: { roles: [] },

  loginStatus: {
    isInProcess: false,
    hasFailed: false,
    error: '',
  },

  logoutStatus: {
    isInProcess: false,
    hasFailed: false,
    error: '',
  },

  savingStatus: {
    isInProcess: false,
    hasFailed: false,
    error: '',
  },

  registrationStatus: {
    isInProcess: false,
    hasFailed: false,
    error: '',
  },
};

export default initialUserState;
