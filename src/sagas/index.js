import loginSaga from '../components/login/sagas/login';
import fetchUserSaga from '../components/user/sagas/fetch';
import logoutSaga from '../components/user/sagas/logout';


import clearLoadingMessageSaga from '../components/loading/sagas/clearLoadingMessage';

export default [
  loginSaga,
  fetchUserSaga,
  logoutSaga,
  clearLoadingMessageSaga,
];
