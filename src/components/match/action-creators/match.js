export const fetchMatchOnSocket = match => ({
  type: 'FETCH_MATCH_SOCKET',
  payload: { match },
});

// export const createMatchThroughSocket = () => ({
//     type: 'CREATE_MATCH_ASYNC',
// });

// export const beginMatch = () => ({
//     type: 'BEGIN_MATCH',
// });

export const fetchRecordOnSocket = record => ({
  type: 'FETCH_RECORD_SOCKET',
  payload: { record },
});

