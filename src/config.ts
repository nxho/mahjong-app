type Config = {
	socket: {
		SERVER_URL: string;
	},
};

const local = {
	socket: {
		SERVER_URL: 'http://localhost:5000',
		// SERVER_URL: 'http://192.168.1.193:5000',
	}
}

const dev = {
	socket: {
		SERVER_URL: 'https://mahjong-server-dev.herokuapp.com',
	}
}

const prod = {
	socket: {
		SERVER_URL: 'https://mahjong-server.herokuapp.com',
	}
}

let config: Config;
switch(process.env.REACT_APP_STAGE) {
	case 'dev':
		config = dev;
		break;
	case 'prod':
		config = prod;
		break;
	default:
		config = local;
}

export default config;

