export enum UnitType {
    Pawn,
    Bishop,
    Knight,
    Rook,
    Queen,
    King,
    None
}

export enum UnitTeam {
    Black,
    White,
    None
}

export class Unit {
    private _type: UnitType = UnitType.None;
    private _team: UnitTeam = UnitTeam.None;

    constructor(unit: string) {
        this._type = this.setType(unit);
        this._team = this.setTeam(unit);
    }

    private setType(unit: string): UnitType {
        if (unit === '-') {
            return UnitType.None;
        }

        switch (unit.toLowerCase()) {
            case 'p':
                return UnitType.Pawn;
            case 'b':
                return UnitType.Bishop;
            case 'n':
                return UnitType.Knight;
            case 'r':
                return UnitType.Rook;
            case 'q':
                return UnitType.Queen;
            case 'k':
                return UnitType.King;
            default:
                return UnitType.None;
        }
    }

    private setTeam(unit: string): UnitTeam {
        if (unit === '-') {
            return UnitTeam.None;
        }

        if (unit === unit.toUpperCase()) {
            return UnitTeam.White;
        }

        return UnitTeam.Black;
    }

    public get type(): UnitType {
        return this._type;
    }

    public get team(): UnitTeam {
        return this._team;
    }
}