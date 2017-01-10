import loginSaga from '../components/login/sagas/loginSaga';
import fetchUserSaga from '../components/user/sagas/fetchUser';
import logoutSaga from '../components/user/sagas/logout';
import clearLoadingMessageSaga from '../components/loading/sagas/clearLoadingMessage';

export default [
    loginSaga,
    fetchUserSaga,
    logoutSaga,
    clearLoadingMessageSaga,
];
