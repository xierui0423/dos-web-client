import { loginEpic, logoutEpic, fetchUserEpic } from '../pages/user/reducers/user-data';
import { fetchMarketEpic } from '../pages/market/reducers/market-data';
import { fetchClubEpic, updatePlayerEpic, updateTacticEpic } from '../pages/club/reducers/club-data';

export default (action$, store) => Rx.Observable.merge(
  loginEpic(action$, store),
  logoutEpic(action$, store),
  fetchUserEpic(action$, store),
  fetchMarketEpic(action$, store),
  fetchClubEpic(action$, store),
  updatePlayerEpic(action$, store),
  updateTacticEpic(action$, store),
);
