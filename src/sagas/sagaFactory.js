import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    const vars = [];
    let hash;
    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i += 1) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

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
            withCredentials,
        },
    }).then(response => response);

    const flowController = function* (action) {
        try {
            const data = yield call(apiInvoker, dataParser && dataParser(action));
            yield put({
                type: `${sagaReducerName}_ASYNC_SUCCEED`,
                [actionDataField]: data.payload,
                message: data.message,
                resolveTimestamp: action.meta.timestamp,
                duration: succeedDuration,
            });

            const redirectUrl = getUrlVars().redirect || redirect;

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
