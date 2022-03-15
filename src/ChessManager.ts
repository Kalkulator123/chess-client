import { BetterFen } from "./BetterFen";

export abstract class ChessManager{
    private static selectedSquare:number = -1;
    private static readonly myFen:BetterFen;

    public static onClick(id:number){
        const unit = BetterFen.value[Math.floor(id/8)][id%8-1];
        if(unit.team===1 && this.selectedSquare===-1){
            this.selectedSquare = id;
        }else{
            //sprawdzanie ruchu
        }
    }
}