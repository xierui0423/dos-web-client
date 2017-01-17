export default () => next => (action) => {
    // Timestamp the action
    return next(
        Object.assign(action,
            {
                meta: Object.assign({}, action.meta, { timestamp: new Date().getTime() }),
            }
        )
    );
};
