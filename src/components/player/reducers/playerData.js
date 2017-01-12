import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('playerData'), action) => {
    switch (action.type) {
        case 'UPDATE_PLAYER_CREATE_STEP':
            return Immutable.fromJS(state.set('createStep',
                state.get('createStep') + (action.isForward ? 1 : -1)));
        default:
            return state;
    }
};

