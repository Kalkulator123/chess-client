import { BetterFen } from "./BetterFen";
import { Unit, UnitTeam, UnitType } from "./Unit";

export class PostionChecker{
    public pos:Unit[][] = [];
    public isWhite = false;
    private enemy:number = this.isWhite ? UnitTeam.Black : UnitTeam.White;
    private ally:number = this.isWhite ? UnitTeam.White : UnitTeam.Black;

    constructor(pos:Unit[][], isWhite:boolean){
        this.pos = pos;
        this.isWhite = isWhite;
        this.ally = this.isWhite ? UnitTeam.White : UnitTeam.Black;
        this.enemy = this.isWhite ? UnitTeam.Black : UnitTeam.White;
    }

    public checkMoves(x:number, y:number): {x:number, y:number}[]{
        switch(BetterFen.value[x][y].type){
            case UnitType.Pawn: return this.legalityCheck(this.pawnMoves(x, y), x, y);
            case UnitType.Bishop: return this.legalityCheck(this.bishopMoves(x, y), x, y);
            case UnitType.Knight: return this.legalityCheck(this.knightMoves(x, y), x, y);
            case UnitType.Rook: return this.legalityCheck(this.rookMoves(x, y), x, y);
            case UnitType.Queen: return this.legalityCheck(this.queenMoves(x, y), x, y);
            case UnitType.King: return this.legalityCheck(this.kingMoves(x, y), x, y);
        }
        
        return this.knightMoves(x, y);
    }

    public pawnMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(this.isWhite){
            if(this.pos[x-1][y].team===UnitTeam.None){
                arr.push({x: x-1, y: y});
                if(x===6){
                    if(this.pos[x-2][y].team===UnitTeam.None){
                        arr.push({x: x-2, y: y});
                    }
                }
            }
            if(y-1>=0){
                if(this.pos[x-1][y-1].team===this.enemy){
                    arr.push({x: x-1, y: y-1});
                }
            }
            if(y+1<8){
                if(this.pos[x-1][y+1].team===this.enemy){
                    arr.push({x: x-1, y: y+1});
                }
            }
        }else{
            if(this.pos[x+1][y].team===UnitTeam.None){
                arr.push({x: x+1, y: y});
                if(x===1){
                    if(this.pos[x+2][y].team===UnitTeam.None){
                        arr.push({x: x+2, y: y});
                    }
                }
            }
            if(y-1>=0){
                if(this.pos[x+1][y-1].team===this.enemy){
                    arr.push({x: x+1, y: y-1});
                }
            }
            if(y+1<8){
                if(this.pos[x+1][y+1].team===this.enemy){
                    arr.push({x: x+1, y: y+1});
                }
            }
        }
        //TODO bicie w przelocie
        return arr;
    }

    public rookMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        //move bot
        for(let i = x+1;i<8;i++){
            if(this.pos[i][y].team===UnitTeam.None){
                arr.push({x: i, y: y});
            }else if(this.pos[i][y].team===this.enemy){
                arr.push({x: i, y: y});
                break;
            }else break;
        }
        //move top
        for(let i = x-1;i>=0;i--){
            if(this.pos[i][y].team===UnitTeam.None){
                arr.push({x: i, y: y});
            }else if(this.pos[i][y].team===this.enemy){
                arr.push({x: i, y: y});
                break;
            }else break;
        }
        //move right
        for(let i = y+1;i<8;i++){
            if(this.pos[x][i].team===UnitTeam.None){
                arr.push({x: x, y: i});
            }else if(this.pos[x][i].team===this.enemy){
                arr.push({x: x, y: i});
                break;
            }else break;
        }
        //move left
        for(let i = y-1;i>=0;i--){
            if(this.pos[x][i].team===UnitTeam.None){
                arr.push({x: x, y: i});
            }else if(this.pos[x][i].team===this.enemy){
                arr.push({x: x, y: i});
                break;
            }else break;
        }
        return arr;
    }

    public knightMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(x+1<8 &&y-2>=0){
            if(this.pos[x+1][y-2].team!==this.ally) arr.push({x: x+1, y: y-2});
        }
        if(x-1>0 &&y-2>=0){
            if(this.pos[x-1][y-2].team!==this.ally) arr.push({x: x-1, y: y-2});
        }
        if(x+1<8 &&y+2<8){
            if(this.pos[x+1][y+2].team!==this.ally) arr.push({x: x+1, y: y+2});
        }
        if(x-1>0 &&y+2<8){
            if(this.pos[x-1][y+2].team!==this.ally) arr.push({x: x-1, y: y+2});
        }
        if(x+2<8 &&y-1>=0){
            if(this.pos[x+2][y-1].team!==this.ally) arr.push({x: x+2, y: y-1});
        }
        if(x-2>0 &&y-1>=0){
            if(this.pos[x-2][y-1].team!==this.ally) arr.push({x: x-2, y: y-1});
        }
        if(x+2<8 &&y+1<8){
            if(this.pos[x+2][y+1].team!==this.ally) arr.push({x: x+2, y: y+1});
        }
        if(x-2>0 &&y+1<8){
            if(this.pos[x-2][y+1].team!==this.ally) arr.push({x: x-2, y: y+1});
        }
        return arr;
    }
    public bishopMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        for(let i=1;i<8;i++){
            if(x+i<8 && y+i<8) if(this.pos[x+i][y+i].team===2) arr.push({x: x+i, y: y+i});
            else if(this.pos[x+i][y+i].team===this.enemy){
                arr.push({x: x+i, y: y+i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x+i<8 && y-i>=0) if(this.pos[x+i][y-i].team===2) arr.push({x: x+i, y: y-i});
            else if(this.pos[x+i][y-i].team===this.enemy){
                arr.push({x: x+i, y: y-i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x-i>=0 && y+i<8) if(this.pos[x-i][y+i].team===2) arr.push({x: x-i, y: y+i});
            else if(this.pos[x-i][y+i].team===this.enemy){
                arr.push({x: x-i, y: y+i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x-i>=0 && y-i>=0) if(this.pos[x-i][y-i].team===2) arr.push({x: x-i, y: y-i});
            else if(this.pos[x-i][y-i].team===this.enemy){
                arr.push({x: x-i, y: y-i});
                break;
            }else break;
            else break;
        }
        return arr;
    }
    public queenMoves(x:number, y:number): {x:number, y:number}[]{
        return this.bishopMoves(x,y).concat(this.rookMoves(x,y));
    }

    public kingMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(x+1<8){
            if(this.pos[x+1][y].team!==this.ally) arr.push({x: x+1, y: y});
        }
        if(x-1>0){
            if(this.pos[x-1][y].team!==this.ally) arr.push({x: x-1, y: y});
        }
        if(y+1<8){
            if(this.pos[x][y+1].team!==this.ally) arr.push({x: x, y: y+1});
        }
        if(y-1>0){
            if(this.pos[x][y-1].team!==this.ally) arr.push({x: x, y: y-1});
        }
        if(x+1<8 && y-1>=0){
            if(this.pos[x+1][y-1].team!==this.ally) arr.push({x: x+1, y: y-1});
        }
        if(x-1>0 && y-1>=0){
            if(this.pos[x-1][y-1].team!==this.ally) arr.push({x: x-1, y: y-1});
        }
        if(x+1<8 && y+1<8){
            if(this.pos[x+1][y+1].team!==this.ally) arr.push({x: x+1, y: y+1});
        }
        if(x-1>0 && y+1<8){
            if(this.pos[x-1][y+1].team!==this.ally) arr.push({x: x-1, y: y+1});
        }
        if(!this.isWhite){
            if(x===4 && y===0 && this.pos[0][7].type===UnitType.Rook && this.pos[0][7].team===this.ally){
                if(this.pos[x][y+1].team===UnitTeam.None && this.pos[x][y+2].team===UnitTeam.None){
                    let positionChecker  = new PostionChecker(BetterFen.value, !this.isWhite);
                    if(!this.isChecked(positionChecker, x, y) && !this.isChecked(positionChecker, x, y+1) && !this.isChecked(positionChecker, x, y+2)){
                        //TODO dodać krótką roszadę
                    }
                }
            }
            if(x===4 && y===0 && this.pos[0][0].type===UnitType.Rook && this.pos[0][0].team===this.ally){
                if(this.pos[x][y-1].team===UnitTeam.None && this.pos[x][y-2].team===UnitTeam.None && this.pos[x][y-3].team===UnitTeam.None){
                    let positionChecker  = new PostionChecker(BetterFen.value, !this.isWhite);
                    if(!this.isChecked(positionChecker, x, y) && !this.isChecked(positionChecker, x, y-1) && !this.isChecked(positionChecker, x, y-2) && !this.isChecked(positionChecker, x, y-2)){
                        //TODO dodać długą roszadę
                    }
                }
            }
        }else{
            if(x===4 && y===0 && this.pos[7][7].type===UnitType.Rook && this.pos[7][7].team===this.ally){
                if(this.pos[x][y+1].team===UnitTeam.None && this.pos[x][y+2].team===UnitTeam.None){
                    let positionChecker  = new PostionChecker(BetterFen.value, !this.isWhite);
                    if(!this.isChecked(positionChecker, x, y) && !this.isChecked(positionChecker, x, y+1) && !this.isChecked(positionChecker, x, y+2)){
                        //TODO dodać krótką roszadę
                    }
                }
            }
            if(x===4 && y===7 && this.pos[7][0].type===UnitType.Rook && this.pos[7][0].team===this.ally){
                if(this.pos[x][y-1].team===UnitTeam.None && this.pos[x][y-2].team===UnitTeam.None && this.pos[x][y-3].team===UnitTeam.None){
                    let positionChecker  = new PostionChecker(BetterFen.value, !this.isWhite);
                    if(!this.isChecked(positionChecker, x, y) && !this.isChecked(positionChecker, x, y-1) && !this.isChecked(positionChecker, x, y-2) && !this.isChecked(positionChecker, x, y-2)){
                        //TODO dodać długą roszadę
                    }
                }
            }
        }
        return arr;
    }
    private isChecked(postionChecker:PostionChecker,x:number, y:number): boolean{
        let a:boolean = false;
        for(let i = 0;i<8;i++){
            for(let j = 0; j<8;j++){
                if(postionChecker.pos[i][j].team===this.enemy){
                    let arr:{x:number, y:number}[] = [];
                    switch(postionChecker.pos[i][j].type){
                        case UnitType.Pawn:  arr = postionChecker.pawnMoves(i, j); break;
                        case UnitType.Bishop: arr = postionChecker.bishopMoves(i, j);break;
                        case UnitType.Knight:  arr = postionChecker.knightMoves(i, j);break;
                        case UnitType.Rook:  arr = postionChecker.rookMoves(i, j);break;
                        case UnitType.Queen: arr = postionChecker.queenMoves(i, j);break;
                        case UnitType.King:  arr = postionChecker.kingMoves(i, j);break;
                    }
                    arr.forEach(element => {
                        if(element.x === x && element.y === y){
                            a = true;
                        } 
                    });
                    
                }
            }
        }
        
        return a;
    }

    private legalityCheck(arr:{x:number,y:number}[], x:number, y:number): {x:number,y:number}[]{
        let arr2:{x:number,y:number}[] = [];
       
        arr.forEach(element => {
            let positionChecker = new PostionChecker(this.nextMoveArray(x, y, element.x, element.y), !this.isWhite)
            for(let i = 0;i<8;i++){
                for(let j = 0; j<8;j++){
                    if(positionChecker.pos[i][j].team===this.ally && positionChecker.pos[i][j].type===UnitType.King){
                        if(!this.isChecked(positionChecker,i,j)) arr2.push(element);
                    }
                }
            }
        });
        return arr2;
    }

    public nextMoveArray(x1:number, y1:number, x2:number, y2:number): Unit[][]{
        let arr:Unit[][] = [];
        for(let i = 0;i<8;i++){
            let row: Unit[] = [];
            for(let j = 0; j<8;j++){
                row.push(BetterFen.value[i][j]);
            }
            arr.push(row);
        }
        arr[x2][y2] = arr[x1][y1];
        arr[x1][y1] = new Unit('-');
        return arr;
    }
}