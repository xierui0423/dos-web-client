export default () => next => (action) => {
    console.log(action.type);

    // Timestamp the action
    return next(
        Object.assign(action,
            {
                meta: Object.assign({}, action.meta, { timestamp: new Date().getTime() }),
            }
        )
    );
};
