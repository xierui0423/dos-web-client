import { loginEpic, logoutEpic, fetchUserEpic } from '../components/user/reducers/user-data';

export default (action$, store) => Rx.Observable.merge(
  loginEpic(action$, store),
  logoutEpic(action$, store),
  fetchUserEpic(action$, store),
);
