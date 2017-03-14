export default

(socket, requestEvent, succeedEvent) => {
    // dataSource: data =>
    //     $.ajax({
    //         url,
    //         method,
    //         contentType: 'application/json',
    //         dataType: 'json',
    //         data,
    //         xhrFields: {
    //             withCredentials: true,
    //         },
    //     }).then(response => response),

    let deferred;

    socket.on(succeedEvent || `${requestEvent}:succeed`, (msg) => {
        if (deferred) {
            deferred.resolve(msg);
            deferred = null;
        }
    });

    return {
        isSocketBased: true,
        dataSource: {
            nextMessage: () => {
                if (!deferred) {
                    deferred = {};
                    deferred.promise =
                        new Promise((resolve) => {
                            deferred.resolve = resolve;
                            return deferred.resolve;
                        });
                }
                return deferred.promise;
            },
            pull: () => {
                socket.emit(requestEvent);
            },

            connect: () => {
                socket.connect();
                return socket.connectPromise;
            },
        },
    };
};

