/**
 * Created by ray.xie on 9/20/2016.
 */
import { succeedLogin, INITIAL_STATE } from '../core';
import { updateLoginForm } from '../components/Login/helper';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return updateLoginForm(state, action.loginData);
        case 'SUCCEED_LOGIN':
            return succeedLogin(state, action.userData);
        default:
            return state;
    }
};

