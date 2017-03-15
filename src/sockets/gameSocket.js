import io from 'socket.io-client';

// const manager = new io.Manager('localhost:9999', { autoConnect: false });
// const socket = manager.socket();

const socket = io('localhost:9999', { autoConnect: false });

socket.on('connect', () => {
    // console.log('connected');
    // socket.emit('join:room', match.id);
}).on('disconnect', () => {
    console.log('disconnected');
}).on('join:room', () => {
    // handleBeginMatch();
}).on('receive:message', (msg) => {
    // handleReceiveRecord(msg);
});


socket.connectPromise = new Promise((resolve, reject) => {
    socket.on('connect', (connectedSocket) => {
        // console.log('connected!!!!!!!!')
        resolve(connectedSocket);
    });
    socket.on('connect_error', () => {
        reject(new Error('connect_error'));
    });
    socket.on('connect_timeout', () => {
        reject(new Error('connect_timeout'));
    });

    // socket.connect();
});


export default socket;

