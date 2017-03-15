import { takeEvery, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import Utils from '../utils/';

export default (sagaReducerName, dataService, redirect,
                succeedDuration = 0, errorDuration = 2000) => {
    function* apiInvokerFlow(action) {
        try {
            const data = yield call(dataService.dataSource,
                dataService.transformInvokingData && dataService.transformInvokingData(action));
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
    }

    return function* () {
        yield takeEvery(`${sagaReducerName}_ASYNC`, apiInvokerFlow);
    };
};
