import { takeEvery, call, put, fork } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import Utils from '../utils/';

const socketWatchers = [];

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

    function* watchSocketMessages(action) {
        yield call(dataService.dataSource.connect);
        let data = yield call(dataService.dataSource.nextMessage);
        while (data) {
            yield put({
                type: `${sagaReducerName}_ASYNC_SUCCEED`,
                payload: data.payload,
                message: data.message,
                resolveTimestamp: action.meta.timestamp,
                duration: succeedDuration,
            });
            data = yield call(dataService.dataSource.nextMessage);
        }
        // console.log('done receive messages');
    }

    function* socketListenerFlow(action) {
        if (!socketWatchers.includes(sagaReducerName)) {
            // const socketListener = yield call(dataService.dataSource);
            yield fork(watchSocketMessages, action);
            socketWatchers.push(sagaReducerName);
        }

        dataService.dataSource.pull(action);
    }

    return function* () {
        yield takeEvery(`${sagaReducerName}_ASYNC`,
            dataService.isSocketBased ? socketListenerFlow : apiInvokerFlow);
    };
};
