/**
 * Created by ray.xie on 12/26/2016.
 */
import { takeEvery, call, put } from 'redux-saga/effects';
import Immutable from 'immutable';


const fetchUser = () => $.ajax({
    url: 'http://localhost:3000/view/test',
    method: 'GET',
    dataType: 'json',
}).then(response => response);

const fetchUserSaga = function* (loginData) {
    const userData = yield call(fetchUser, '');
    yield put({
        type: 'SUCCEED_LOGIN',
        userData: Immutable.fromJS(userData),
    });
};

export const handleLoginSaga = function* (loginData) {
    yield takeEvery('LOGIN', fetchUserSaga, loginData);
};
