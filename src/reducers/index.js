import { reducer as form } from 'redux-form/immutable';
import loadingMessages from '../components/loading/reducers/loadingMessages';
import navigation from '../components/navigation/reducers/navigation';
import userData from '../components/user/reducers/userData';
import playerData from '../components/player/reducers/playerData';
import routing from './routing';

export default {
    loadingMessages,
    navigation,
    userData,
    playerData,
    routing,
    form,
};
