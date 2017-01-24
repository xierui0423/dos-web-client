import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('playerData'), action) => {
    switch (action.type) {
        case 'UPDATE_PLAYER_CREATE_STEP':
            return Immutable.fromJS(state.set('createStep',
                state.get('createStep') + (action.isForward ? 1 : -1)));
        case 'FETCH_PLAYER_ASYNC_SUCCEED':
            return Immutable.fromJS(action.playerData.id
                ? action.playerData : InitialState.get('playerData')).set('retrieved', true);
        case 'LOGOUT_ASYNC_SUCCEED':
            return Immutable.fromJS(InitialState.get('playerData'));
        default:
            return state;
    }
};

