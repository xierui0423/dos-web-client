/**
 * Created by ray.xie on 12/26/2016.
 */
import { select, take, takeEvery, call, put } from 'redux-saga/effects';
import Immutable from 'immutable';


const fetchUser = loginData => $.ajax({
    url: `http://localhost:3000/view/test${loginData.get('username')}`,
    method: 'GET',
    dataType: 'json',
}).then(response => response);

const fetchUserSaga = function* (action) {
    const userData = yield call(fetchUser, action.loginData);
    yield put({
        type: 'SUCCEED_LOGIN',
        userData: Immutable.fromJS(userData),
    });
};


export const handleLoginSaga = function* () {
    yield takeEvery('LOGIN_ASYNC', fetchUserSaga);
};

export const handleLoadingSaga = function* () {
    while (true) {
        const action = yield take('*_ASYNC$');
        // const state = yield select();
        console.log('action', action);
        // console.log('state after', state);
    }
};
