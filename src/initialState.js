import io from 'socket.io-client';
import config from './config';

export default {
	socket: io(config.socketio.SERVER, {transports: ['websocket']}),
}
