import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

export default (sagaReducerName, url, method, actionDataField,
                dataParser, redirect, withCredentials = true,
                succeedDuration = 0, errorDuration = 2000) => {
    const apiInvoker = data => $.ajax({
        url,
        method,
        contentType: 'application/json',
        dataType: 'json',
        data,
        xhrFields: {
            withCredentials: true,
        },
    }).then(response => response);

    const flowController = function* (action) {
        try {
            yield put({
                type: `${sagaReducerName}_ASYNC_SUCCEED`,
                [actionDataField]: yield call(apiInvoker, dataParser && dataParser(action)),
                resolveTimestamp: action.meta.timestamp,
                duration: succeedDuration,
            });

            if (redirect) {
                hashHistory.push(redirect);
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