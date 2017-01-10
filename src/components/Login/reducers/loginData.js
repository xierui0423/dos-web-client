import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('loginData'), action) => {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Immutable.fromJS(action.loginData);
        default:
            return state;
    }
};

