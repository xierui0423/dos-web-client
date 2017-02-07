import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('CREATE_MATCH', 'http://localhost:3000/api/private/match/create/',
    'POST');

