export const updateStep = isForward => ({
  type: 'UPDATE_PLAYER_CREATE_STEP',
  isForward,
});

export const createPlayer = playerData => ({
  type: 'CREATE_PLAYER_ASYNC',
  playerData,
});

export const fetchPlayer = () => ({
  type: 'FETCH_PLAYER_ASYNC',
});

