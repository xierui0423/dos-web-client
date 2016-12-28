export const updateLoginForm = loginData => ({
    type: 'UPDATE_LOGIN_FORM',
    loginData,
});

export const login = loginData => ({
    type: 'LOGIN_ASYNC',
    loginData,
});