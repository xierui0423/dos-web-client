/**
 * Created by ray.xie on 12/26/2016.
 */
import { takeEvery, call, put } from 'redux-saga/effects';

const fetchUser = () => $.ajax({
    url: 'http://localhost:3000/api/private/account/user/retrieve/',
    method: 'GET',
    dataType: 'json',
    xhrFields: {
        withCredentials: true,
    },
}).then(response => response);

const fetchUserSaga = function* (action) {
    try {
        yield put({
            type: 'FETCH_USER_ASYNC_SUCCEED',
            userData: yield call(fetchUser),
            resolveTimestamp: action.meta.timestamp,
            duration: 0,
        });
    } catch (err) {
        yield put({
            type: 'FETCH_USER_ASYNC_ERROR',
            error: err,
            resolveTimestamp: action.meta.timestamp,
            duration: 2000,
        });
    }
};

export default function* () {
    yield takeEvery('FETCH_USER_ASYNC', fetchUserSaga);
}

