const axios = require('axios');

export class ServerChess {
    public getAll(): any {
        axios
            .get('http://localhost:8080/games/')
            .then((res: any) => {
                console.log(res.status);
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    public async getOne(id: string): Promise<any> {
        try {
            const options = {
                method: "GET",
                header: { "content-type": "application/x-www-form-urlencoded" },
                url: 'http://127.0.0.1:8080/games/' + id,
            }
            
            const response = await axios(options);
            console.log(response);
        } catch (e) {
            console.log(e);

        }
    }

    public createGame(): any {
        axios
            .post('http://localhost:8080/games/')
            .then((res: any) => {
                console.log(res.status);
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    public async updateGame(id: string, move: string): Promise<any> {
        try {
            const body: any = {
                move: move,
            }

            const data = Object.keys(body).map((key) => `${key}=${encodeURIComponent(body[key])}`).join('&');

            const options = {
                method: "PUT",
                header: { "content-type": "application/x-www-form-urlencoded" },
                data,
                url: 'http://127.0.0.1:8080/games/' + id,
            }
            
            const response = await axios(options);
            if(response.status === 200) {
            console.log(response);

                return;
            }
            console.log(response);
        } catch (e) {
            console.log(e);

        }
    }
}