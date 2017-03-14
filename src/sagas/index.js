import loginSaga from '../components/login/sagas/login';
import fetchUserSaga from '../components/user/sagas/fetch';
import fetchPlayerSaga from '../components/player/sagas/fetch';
// import connectGameSocketSaga from '../components/match/sagas/connect';
import fetchMatchSaga from '../components/match/sagas/fetch';
import createPlayerSaga from '../components/player/sagas/create';
import createMatchSaga from '../components/match/sagas/create';
import logoutSaga from '../components/user/sagas/logout';


import clearLoadingMessageSaga from '../components/loading/sagas/clearLoadingMessage';

export default [
    loginSaga,
    fetchUserSaga,
    fetchPlayerSaga,
    // connectGameSocketSaga,
    fetchMatchSaga,
    createPlayerSaga,
    createMatchSaga,
    logoutSaga,
    clearLoadingMessageSaga,
];
