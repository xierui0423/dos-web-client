export const fetchMatch = () => ({
    type: 'FETCH_MATCH_ASYNC',
});

export const createMatch = () => ({
    type: 'CREATE_MATCH_ASYNC',
});

export const beginMatch = () => ({
    type: 'BEGIN_MATCH',
});

export const receiveRecord = record => ({
    type: 'RECEIVE_RECORD',
    payload: { record },
});

