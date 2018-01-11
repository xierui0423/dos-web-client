export const fetchUser = () => ({
  type: 'FETCH_USER_ASYNC',
});

// TODO probably this should also be dispatched upon authentication failure
export const logout = () => ({
  type: 'LOGOUT_ASYNC',
});
