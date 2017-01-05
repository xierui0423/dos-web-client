/**
 * Created by ray.xie on 12/26/2016.
 */
import { takeEvery, call, put } from 'redux-saga/effects';

const fetchUser = loginData => $.ajax({
    url: `http://localhost:3000/view/test${loginData.get('username')}`,
    method: 'GET',
    dataType: 'json',
}).then(response => response);

const fetchUserSaga = function* (action) {
    try {
        yield put({
            type: 'LOGIN_ASYNC_SUCCEED',
            userData: yield call(fetchUser, action.loginData),
            resolveTimestamp: action.meta.timestamp,
            duration: 1000,
        });
    } catch (err) {
        yield put({
            type: 'LOGIN_ASYNC_ERROR',
            error: err,
            resolveTimestamp: action.meta.timestamp,
            duration: 5000,
        });
    }
};

export const handleLoginSaga = function* () {
    yield takeEvery('LOGIN_ASYNC', fetchUserSaga);
};

