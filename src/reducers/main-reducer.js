/**
 * Created by ray.xie on 9/20/2016.
 */
import Immutable from 'immutable';
import { succeedLogin } from '../core';
import { updateLoginForm } from '../components/login/helper';
import { INITIAL_STATE } from '../state/state';


export default (state = INITIAL_STATE, action) => {
    let nextState = state;

    let loadingMessages = state.get('loadingMessages').toJSON();

    // Actions with certain pattern will affect the loading state of the app, we handle it here
    // Loading - 0
    // Succeed - 1
    // Error   - -1
    if (action.type.match(/_ASYNC$/ig)) {
        loadingMessages.push({
            loading: 0,
            message: action.message || 'Is Loading......',
            timestamp: action.meta.timestamp,
        });
    } else if (action.type.match(/_ASYNC_SUCCEED$/ig)) {
        loadingMessages = loadingMessages.filter(msg => msg.timestamp !== action.resolveTimestamp);
        loadingMessages.push({
            loading: 1,
            message: action.message || 'Loaded!',
            timestamp: action.meta.timestamp,
        });
    } else if (action.type.match(/_ASYNC_ERROR$/ig)) {
        loadingMessages = loadingMessages.filter(msg => msg.timestamp !== action.resolveTimestamp);
        loadingMessages.push({
            loading: -1,
            message: action.error.responseText || action.error || 'Error Happened!',
            timestamp: action.meta.timestamp,
        });
    } else if (action.type === 'ASYNC_CLEAR') {
        loadingMessages = loadingMessages.filter(msg => msg.timestamp !== action.dismissTimestamp);
    }

    nextState = state.set('loadingMessages', Immutable.fromJS(loadingMessages));

    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return updateLoginForm(nextState, action.loginData);
        case 'LOGIN_ASYNC_SUCCEED':
            return succeedLogin(nextState, action.userData);
        default:
            return nextState;
    }
};
