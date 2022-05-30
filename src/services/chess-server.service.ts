import { pid } from "process";

const axios = require("axios");

export class ServerChess {
	private serverUrl:string = "http://127.0.0.1:8080";
	public async createPlayer(): Promise<any> {
		try {
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: this.serverUrl + "/player/create",
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
			const options = {
				method: "POST",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: this.serverUrl + "/move/" + move,
				data: {
					playerId: pID,
					currentGame: gID,
				},
			};

			const response = await axios(options);
			//console.log(response);
			return response.data;
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
				url: this.serverUrl + "/game/create/" + yourTeam + "/" + botOrPlayer,
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
				url: this.serverUrl + "/game/join/" + id,
			};

			const response = await axios(options);
			//console.log(response);
			return response;
		} catch (e) {
			console.log(e);
		}
	}

	public async getGame(gID: string): Promise<any> {
		try {
			const options = {
				method: "GET",
				header: { "content-type": "application/x-www-form-urlencoded" },
				url: this.serverUrl + "/game/",
				data: {
					abc: "def",
					currentGame: "6294ca2bdccf23bcc1965843",
				},
			};

			const response = await axios(options);
			//console.log(response);
			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}
