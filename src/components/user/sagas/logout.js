import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

const logout = () => $.ajax({
    url: 'http://localhost:3000/api/private/account/user/logout/',
    method: 'GET',
    dataType: 'json',
    xhrFields: {
        withCredentials: true,
    },
}).then(response => response);

const logoutSaga = function* (action) {
    try {
        yield put({
            type: 'LOGOUT_ASYNC_SUCCEED',
            userData: yield call(logout),
            resolveTimestamp: action.meta.timestamp,
            duration: 0,
        });

        hashHistory.push('/login');
    } catch (err) {
        yield put({
            type: 'LOGOUT_ASYNC_ERROR',
            error: err,
            resolveTimestamp: action.meta.timestamp,
            duration: 2000,
        });
    }
};

export default function* () {
    yield takeEvery('LOGOUT_ASYNC', logoutSaga);
}

