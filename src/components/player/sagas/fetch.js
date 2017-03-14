import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'http://localhost:3000/api/private/player/retrieve/',
    'GET');

export default sagaFactory('FETCH_PLAYER', apiInvoker);
