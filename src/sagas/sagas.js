/**
 * Created by ray.xie on 1/4/2017.
 */
import { call, takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

const clearLoadingMessage = function* (action) {
    yield call(delay, action.duration === 0 ? 0 : action.duration ||
    (action.type.match(/_ASYNC_SUCCEED$/ig) ? 1000 : 5000));

    yield put({
        type: 'ASYNC_CLEAR',
        dismissTimestamp: action.meta.timestamp,
    });
};

export const clearLoadingMessageSaga = function* () {
    yield takeEvery(action => action.type.match(/_ASYNC_SUCCEED$/ig), clearLoadingMessage);
    yield takeEvery(action => action.type.match(/_ASYNC_ERROR$/ig), clearLoadingMessage);
};

