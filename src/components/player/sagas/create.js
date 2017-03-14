import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'http://localhost:3000/api/private/player/create/',
    'POST',
    action => (JSON.stringify({
        player: action.playerData.toJSON(),
    })));

export default sagaFactory('CREATE_PLAYER', '/player', apiInvoker, 2000);
