const initialUserState = {
  currentUser: { roles: [] },
  loginStatus: { isLoginInProcess: false, hasLoginFailed: false, loginError: '' },
  logoutStatus: { isLogoutInProcess: false, hasLogoutFailed: false, logoutError: '' },
  savingStatus: { isSavingInProcess: false, hasSavingFailed: false, savingError: '' },
  registrationStatus: { isRegistrationInProcess: false, hasRegistrationFailed: false, registrationError: '' },
};

export default initialUserState;
