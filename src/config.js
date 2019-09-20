const local = {
	socketio: {
		SERVER: 'http://localhost:5000',
	}
}

const dev = {
	socketio: {
		SERVER: 'https://desolate-scrubland-56031.herokuapp.com',
	}
}

const config = process.env.REACT_APP_STAGE === 'dev'
	? dev
	: local;

export default config;

