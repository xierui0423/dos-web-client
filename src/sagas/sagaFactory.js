import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import Utils from '../utils/';

export default (sagaReducerName, url, method, dataParser, redirect, withCredentials = true,
                succeedDuration = 0, errorDuration = 2000) => {
    const apiInvoker = data => $.ajax({
        url,
        method,
        contentType: 'application/json',
        dataType: 'json',
        data,
        xhrFields: {
            withCredentials,
        },
    }).then(response => response);

    const flowController = function* (action) {
        try {
            const data = yield call(apiInvoker, dataParser && dataParser(action));
            yield put({
                type: `${sagaReducerName}_ASYNC_SUCCEED`,
                payload: data.payload,
                message: data.message,
                resolveTimestamp: action.meta.timestamp,
                duration: succeedDuration,
            });

            const redirectUrl = Utils.getUrlVars().redirect || redirect;

            if (redirectUrl) {
                hashHistory.push(redirectUrl);
            }
        } catch (err) {
            yield put({
                type: `${sagaReducerName}_ASYNC_ERROR`,
                error: err,
                resolveTimestamp: action.meta.timestamp,
                duration: errorDuration,
            });
        }
    };

    return function* () {
        yield takeEvery(`${sagaReducerName}_ASYNC`, flowController);
    };
};
