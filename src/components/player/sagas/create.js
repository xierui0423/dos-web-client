import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('CREATE_PLAYER', 'http://localhost:3000/api/private/player/create/',
    'POST', 'playerData', action => (JSON.stringify({
        player: action.playerData.toJSON(),
    })), '/player', true, 2000);
