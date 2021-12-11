class CreateEventListener {
	constructor(socket, success, fail) {
		const connectError = new Error('連接後端失敗！');

		socket.addEventListener('message', ({ data }) => success(data));
		socket.addEventListener('error', () => fail(connectError));
		socket.addEventListener('close', () => fail(connectError));
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

				Fetch.client.send(JSON.stringify({
					url,
					config
				});
			});
		} else {
			throw new Error('非法調用此方法，已忽略本次調用，請傳入參數。');
		};
	};
};

export default Fetch;
