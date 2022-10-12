export type Message = {
	msgType: string;
	msgText: string;
};

const messages = (messages: Message[] = [], action: any) => {
	switch (action.type) {
		case 'UPDATE_MESSAGES':
			return [...messages, action.message];
		default:
			return messages;
	}
}

export default messages;

