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

    public getOne(id: string): any {
        axios
            .get('http://localhost:8080/games/' + id)
            .then((res: any) => {
                console.log(res.status);
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
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

    public updateGame(id: string, move: string): any {
        axios
            .put('http://localhost:8080/games/' + id, { move: move })
            .then((res: any) => {
                console.log(res.status);
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
}