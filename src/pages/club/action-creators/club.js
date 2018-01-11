export const fetchClub = () => ({
  type: 'FETCH_CLUB_ASYNC',
});

export const updatePlayer = players => ({
  type: 'UPDATE_PLAYER_ASYNC',
  payload: { players },
});

export const updateTactic = tactic => ({
  type: 'UPDATE_TACTIC_ASYNC',
  payload: { tactic },
});

