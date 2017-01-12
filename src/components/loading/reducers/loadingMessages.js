import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('loadingMessages'), action) => {

    if (action.type === 'LOGOUT_ASYNC_SUCCEED') {
        return InitialState.get('loadingMessages');
    }

    let loadingMessages = state.toJSON();

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
            message: (action.error && action.error.responseText) || action.error || 'Error Happened!',
            timestamp: action.meta.timestamp,
        });
    } else if (action.type === 'ASYNC_CLEAR') {
        loadingMessages = loadingMessages.filter(msg => msg.timestamp !== action.dismissTimestamp);
    }

    return Immutable.fromJS(loadingMessages);
};
