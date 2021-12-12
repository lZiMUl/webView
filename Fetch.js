class CreateEventListener {
	constructor(socket, success, fail) {
		socket.addEventListener('message', ({ data }) => success(data));
		socket.addEventListener('error', () => fail(new Error('An error occurred in the rear end!')));
		socket.addEventListener('close', () => fail(new Error('An error occurred in the rear end!')));
	}
}

class Fetch extends CreateEventListener {
	static client = new WebSocket('ws://localhost:4769/');
	static status = false;

	constructor(url, config = {}) {
		if (url) {
			return new Promise((success, fail) => {
				if (!Fetch.status) {
					Fetch.status = true;
					super(Fetch.client, success, fail);
				};
				
				Fetch.client.addEventListener('open', () => {
					Fetch.client.send(JSON.stringify({
						url,
						config
					}));
				})
			});
		} else {
			throw new Error('Illegal calling this method has been ignored, and this call is neglected, please enter the parameter.');
		};
	};
};

export default Fetch;
