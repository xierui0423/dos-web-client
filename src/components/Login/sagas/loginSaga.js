/**
 * Created by ray.xie on 12/26/2016.
 */
import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

const login = loginData => $.ajax({
    url: 'http://localhost:3000/api/public/account/user/login/',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({ username: loginData.get('username'), password: loginData.get('password') }),
    xhrFields: {
        withCredentials: true,
    },
}).then(response => response);

const loginSaga = function* (action) {
    try {
        yield put({
            type: 'LOGIN_ASYNC_SUCCEED',
            userData: yield call(login, action.loginData),
            resolveTimestamp: action.meta.timestamp,
            duration: 0,
        });

        hashHistory.push('/');
    } catch (err) {
        yield put({
            type: 'LOGIN_ASYNC_ERROR',
            error: err,
            resolveTimestamp: action.meta.timestamp,
            duration: 2000,
        });
    }
};

export default function* () {
    yield takeEvery('LOGIN_ASYNC', loginSaga);
}

