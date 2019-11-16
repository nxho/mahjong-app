const local = {
	socket: {
		SERVER_URL: 'http://localhost:5000',
		// SERVER_URL: 'http://192.168.1.193:5000',
	}
}

const dev = {
	socket: {
		SERVER_URL: 'https://mahjong-server.herokuapp.com',
	}
}

const config = process.env.REACT_APP_STAGE === 'dev'
	? dev
	: local;

export default config;

