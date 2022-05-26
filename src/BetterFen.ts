import {
    VERTICAL_AXIS,
    HORIZONTAL_AXIS,
    GRID_SIZE,
    Piece,
    PieceType,
    TeamType,
    Position,
    samePosition,
  } from "./Constants";
  import { ServerChess} from './services/chess-server.service';
export abstract class BetterFen {
    
    private static readonly regexPattern: RegExp = /^[PBNRQKpbnrqk/1-8]+$/;
    private static _value: Piece[] = this.parseFenToArray("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    private static server = new ServerChess();
    private static gameId = "62656968ecd2f2c6adcd33a8";
    // private static _value: Unit[][] = this.parseFenToArray("8/8/8/1R1p4/2B5/8/8/8 w - - 0 1");
    /*constructor(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR") {
        if (this.regexPattern.test(fen)) {
            this._value = this.parseFenToArray(fen);
            return;
        }
        this._value = this.parseFenToArray("8/8/8/8/8/8/8/8");
    }*/
    private static parseFenToArray(fen: string): Piece[] {
        console.log("1");
        let value: Piece[] = [];
        const fenrow = fen.split('/');

        for (let i = 0; i < fenrow.length; i++) {
            for (let j = 0; j < fenrow[i].length; j++) {
                let char: string = fenrow[i][j];

                if (isNaN(parseInt(char))) {
                    let unit = {
                        image: this.getImage(char),
                        position: {
                            x: j,
                            y: 7-i,
                        },
                        type: this.getType(char),
                        team: this.getTeam(char),
                    };
                    value.push(unit);
                    continue;
                }

            }
        }

        return value;
    }

    private static getType(char:string):PieceType{
        switch(char.toLowerCase()){
            case "r": return PieceType.ROOK;
            case "n": return PieceType.KNIGHT;
            case "b": return PieceType.BISHOP;
            case "q": return PieceType.QUEEN;
            case "k": return PieceType.KING;
            case "p": return PieceType.PAWN;
        }
        return PieceType.PAWN;
    }
    private static getImage(char:string):string{
        switch(char){
            case "r": return `assets/images/rook_b.png`;
            case "n": return `assets/images/knight_b.png`;
            case "b": return `assets/images/bishop_b.png`;
            case "q": return `assets/images/queen_b.png`;
            case "k": return `assets/images/king_b.png`;
            case "p": return `assets/images/pawn_b.png`;
            case "R": return `assets/images/rook_w.png`;
            case "N": return `assets/images/knight_w.png`;
            case "B": return `assets/images/bishop_w.png`;
            case "Q": return `assets/images/queen_w.png`;
            case "K": return `assets/images/king_w.png`;
            case "P": return `assets/images/pawn_w.png`;
        }
        return `assets/images/pawn_w.png`;
    }
    private static getTeam(char:string):TeamType{
        if(char===char.toUpperCase())return TeamType.OUR;
        return TeamType.OPPONENT;
    }
    public static setFenByString(fen: string) {
        if (this.regexPattern.test(fen)) {
            this.value = this.parseFenToArray(fen);
        }
    }


    public static get value(): Piece[] {
        return this._value;
    }

    public static set value(fen: Piece[]) {
        this._value = fen;
    }
}
