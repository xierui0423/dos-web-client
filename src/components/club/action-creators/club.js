export const fetchClub = () => ({
  type: 'FETCH_CLUB_ASYNC',
});

export const updatePlayer = clubData => ({
  type: 'UPDATE_PLAYER_ASYNC',
  payload: clubData,
});
