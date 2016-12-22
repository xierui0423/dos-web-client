/**
 * Created by ray.xie on 9/26/2016.
 */

export const initialize = state => ({
    type: 'INITIALIZE_STATE',
    state,
});


export const change = value => ({
    type: 'CHANGE',
    value,
});

export const login = loginUser => ({
    type: 'LOGIN',
    loginUser,
});

