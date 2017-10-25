import { loginEpic, logoutEpic, fetchUserEpic } from '../components/user/reducers/user-data';
import { fetchMarketEpic } from '../components/market/reducers/market-data';
import { fetchClubEpic, updateClubEpic } from '../components/club/reducers/club-data';

export default (action$, store) => Rx.Observable.merge(
  loginEpic(action$, store),
  logoutEpic(action$, store),
  fetchUserEpic(action$, store),
  fetchMarketEpic(action$, store),
  fetchClubEpic(action$, store),
  updateClubEpic(action$, store),
);
