import { reducer as form } from 'redux-form/immutable';
import loadingMessages from '../components/loading/reducers/loadingMessages';
import navigation from '../components/navigation/reducers/navigation';
import userData from '../components/user/reducers/userData';
import initialLoaded from './initial';

export default {
  loadingMessages,
  navigation,
  userData,
  initialLoaded,
  form,
};
