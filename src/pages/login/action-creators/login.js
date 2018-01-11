// export const updateLoginForm = loginData => ({
//   type: 'UPDATE_LOGIN_FORM',
//   payload: loginData,
// });

export const login = loginData => ({
  type: 'LOGIN_ASYNC',
  payload: loginData,
});
