import { push } from 'react-router-redux';
import Utils from './utils';
import config from '../../config/index';

const ajaxInvoker = request => ({
  source: data =>
    $.ajax({
      url: config.webServer.apiRoot + request.url,
      method: request.method,
      contentType: 'application/json',
      dataType: 'json',
      data,
      xhrFields: {
        withCredentials: true,
      },
    }).then(response => response),

  inputHandler: request.inputHandler,
});


export default (actionName, request, redirect, succeedDuration = 0, errorDuration = 2000) => {
  const dataService = ajaxInvoker(request);
  const redirectUrl = Utils.getUrlVars().redirect || redirect;
  return action$ => action$.ofType(`${actionName}_ASYNC`).mergeMap(
    action => Rx.Observable.fromPromise(dataService.source(
      typeof dataService.inputHandler === 'function' && dataService.inputHandler(action)))
      .map(data => ({
        type: `${actionName}_ASYNC_SUCCEED`,
        payload: data.payload,
        message: data.message,
        resolveTimestamp: action.meta.timestamp,
      })).catch(err => (Rx.Observable.of({
        type: `${actionName}_ASYNC_ERROR`,
        error: err,
        resolveTimestamp: action.meta.timestamp,
      }).concat(Rx.Observable.of({
        type: 'ASYNC_CLEAR',
        dismissTimestamp: action.meta.timestamp,
      }).delay(errorDuration))))
      .concat(redirectUrl ? Rx.Observable.of(push(redirectUrl)) : Rx.Observable.empty())
      .concat(Rx.Observable.of({
        type: 'ASYNC_CLEAR',
        dismissTimestamp: action.meta.timestamp,
      }).delay(succeedDuration))
    ,
  );
};
