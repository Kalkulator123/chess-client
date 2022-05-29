import { pid } from "process";

const axios = require("axios");

export class ServerChess {
	public async createPlayer(): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/player/create",
			};
			const response = await axios(options);
			// console.log(response);
			return response.data.playerId;
		} catch (e) {
			console.log(e);
		}
	}

	public async makeMove(move: string, pID: string, gID: string): Promise<any> {
		try {
			console.log(pID + "   " + gID);
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: "http://127.0.0.1:8080/move/" + move,
				// url: "http://127.0.0.1:8080/move/d2d3",
				data: {
					playerId: pID,
					currentGame: gID,
				},
			};

			const response = await axios(options);
			console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}

	public async createGame(
		yourTeam: string,
		botOrPlayer: string,
		pID: string
	): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url:
					"http://127.0.0.1:8080/game/create/" + yourTeam + "/" + botOrPlayer,
				// "http://127.0.0.1:8080/game/create/black/bot",
				data: {
					playerId: pID,
				},
			};

			const response = await axios(options);
			// console.log(response);
			return response.data.id;
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
}
