import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'http://localhost:3000/api/private/match/create/',
    'POST');

export default sagaFactory('CREATE_MATCH', apiInvoker);

