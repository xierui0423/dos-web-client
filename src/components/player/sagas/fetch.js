import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('FETCH_PLAYER', 'http://localhost:3000/api/private/player/retrieve/',
    'GET', 'playerData');
