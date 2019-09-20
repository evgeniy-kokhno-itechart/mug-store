const initialUserState = {
  currentUser: { roles: [] },
  loginStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  logoutStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  savingStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  registrationStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
};

export default initialUserState;
