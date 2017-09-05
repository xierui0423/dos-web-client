import sagaFactory from '../../../sagas/saga-factory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'private/account/user/retrieve/',
    'GET');

export default sagaFactory('FETCH_USER', apiInvoker);

