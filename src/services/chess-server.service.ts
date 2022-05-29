const axios = require("axios");
axios.defaults.withCredentials = true;

export class ServerChess {

	// public async getOne(id: string): Promise<any> {
	// 	try {
	// 		const options = {
	// 			method: "GET",
	// 			header: { "content-type": "application/x-www-form-urlencoded" },
	// 			url: "http://127.0.0.1:8080/games/" + id,
	// 		};

	// 		const response = await axios(options);
	// 		console.log(response);
	// 		return response;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }
	public async getPlayer(): Promise<any> {
		try {
			const options = {
				method: "GET",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/player",
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	
	public async createPlayer(): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/player/create",
			};
			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	public async deletePlayer(): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/player/delete",
			};
			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	public async makeMove(move: string): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/move/" + move,
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}

	public async createGame(yourTeam: string, botOrPlayer:string): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/game/create/" + yourTeam + "/" + botOrPlayer,
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	public async joinGame(id: string): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/game/join/" + id,
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	public async getGame(): Promise<any> {
		try {
			const options = {
				method: "GET",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/game",
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	public async quitGame(): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/game/quit",
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
}
