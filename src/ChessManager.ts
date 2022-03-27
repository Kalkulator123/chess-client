import { BetterFen } from "./BetterFen";
import { PostionChecker } from "./PositionChecker";
import { UnitTeam } from "./Unit";
export abstract class ChessManager{
    private static selectedSquare:number = -1;
    private static readonly myFen:BetterFen;

    public static onClick(id:number){
        let positionChecker:PostionChecker = new PostionChecker(BetterFen.value, false);
        id--;
        const unit = BetterFen.value[Math.floor(id/8)][id%8];
        if(unit.team===(positionChecker.isWhite ? 1 : 0) && this.selectedSquare===-1){
            this.selectedSquare = id;
            console.log(positionChecker.checkMoves(Math.floor(id/8), id%8));
        }else if(this.selectedSquare!==-1){
            //TODO sprawdzanie ruchu
            
        }
    }

    
}