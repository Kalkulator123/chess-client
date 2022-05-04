import { Unit, UnitType, UnitTeam } from "./Unit";

export abstract class BetterFen {
    
    private static readonly regexPattern: RegExp = /^[PBNRQKpbnrqk/1-8]+$/;
    private static _value: Unit[][] = this.parseFenToArray("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    // private static _value: Unit[][] = this.parseFenToArray("8/8/8/1R1p4/2B5/8/8/8 w - - 0 1");
    /*constructor(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR") {
        if (this.regexPattern.test(fen)) {
            this._value = this.parseFenToArray(fen);
            return;
        }
        this._value = this.parseFenToArray("8/8/8/8/8/8/8/8");
    }*/

    private static parseFenToArray(fen: string): Unit[][] {
        let value: Unit[][] = [];
        const fenrow = fen.split('/');

        for (let i = 0; i < fenrow.length; i++) {
            let row: Unit[] = [];

            for (let j = 0; j < fenrow[i].length; j++) {
                let char: string = fenrow[i][j];

                if (isNaN(parseInt(char))) {
                    let unit = new Unit(char);
                    row.push(unit);
                    continue;
                }

                this.placeEmpty(parseInt(char), row);
            }

            value.push(row);
        }

        return value;
    }

    private static placeEmpty(n: number, arr: Unit[]): Unit[] {
        const unit = new Unit('-');

        for (let i = 0; i < n; i++) {
            arr.push(unit);
        }

        return arr;
    }

    public static setFenByString(fen: string) {
        if (this.regexPattern.test(fen)) {
            this.value = this.parseFenToArray(fen);
        }
    }

    private static createStringFen(): string {
        let fen: string = "";

        for (let i = 0; i < this._value.length; i++) {
            let empty = 0;

            for (let j = 0; j < this._value[i].length; j++) {
                if (this._value[i][j].type === UnitType.None) {
                    empty++;

                    if (j === this._value[i].length - 1) fen += empty;
                    continue;
                }

                if (empty > 0) {
                    fen += empty;
                    console.log(empty);
                    empty = 0;
                }

                let unit = UnitType[this._value[i][j].type].substring(0, 1);
                if (this._value[i][j].team === UnitTeam.Black) unit = unit.toLowerCase();

                fen += unit;
            }

            fen += "/";
        }

        return fen.substring(0, fen.length - 1);
    }

    public static get stringValue(): string {
        return this.createStringFen();
    }

    public static get value(): Unit[][] {
        return this._value;
    }

    public static set value(fen: Unit[][]) {
        this._value = fen;
    }
    public static getPiece(i:number, j:number): string{
        return UnitType[this._value[i][j].type];
    }
    public static getTeam(i:number, j:number): string{
        return UnitTeam[this._value[i][j].team];
    }
}