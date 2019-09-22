const local = {
	socket: {
		SERVER_URL: 'http://localhost:5000',
	}
}

const dev = {
	socket: {
		SERVER_URL: 'https://desolate-scrubland-56031.herokuapp.com',
	}
}

const config = process.env.REACT_APP_STAGE === 'dev'
	? dev
	: local;

export default config;

