import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('FETCH_MATCH', 'http://localhost:3000/api/private/match/retrieve/',
    'GET');

