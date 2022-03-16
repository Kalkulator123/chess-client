import { BetterFen } from "./BetterFen";
export abstract class PostionChecker{
    public static isWhite = false;
    private static enemy:number = this.isWhite ? 0 : 1;
    private static ally:number = this.isWhite ? 1 : 0;
    public static checkMoves(x:number, y:number): {x:number, y:number}[]{
        switch(BetterFen.value[x][y].type){
            case 0: return this.pawnMoves(x, y);
            case 1: return this.bishopMoves(x, y);
            case 2: return this.knightMoves(x, y);
            case 3: return this.rookMoves(x, y);
            case 4: return this.queenMoves(x, y);
            case 5: return this.kingMoves(x, y);
        }
        return this.knightMoves(x, y);
    }
    private static pawnMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(this.isWhite){
            if(BetterFen.value[x-1][y].team===2){
                arr.push({x: x-1, y: y});
                if(x===6){
                    if(BetterFen.value[x-2][y].team===2){
                        arr.push({x: x-2, y: y});
                    }
                }
            }
            if(y-1>=0){
                if(BetterFen.value[x-1][y-1].team===this.enemy){
                    arr.push({x: x-1, y: y-1});
                }
            }
            if(y+1<8){
                if(BetterFen.value[x-1][y+1].team===this.enemy){
                    arr.push({x: x-1, y: y+1});
                }
            }
        }else{
            if(BetterFen.value[x+1][y].team===2){
                arr.push({x: x+1, y: y});
                if(x===1){
                    if(BetterFen.value[x+2][y].team===2){
                        arr.push({x: x+2, y: y});
                    }
                }
            }
            if(y-1>=0){
                if(BetterFen.value[x+1][y-1].team===this.enemy){
                    arr.push({x: x+1, y: y-1});
                }
            }
            if(y+1<8){
                if(BetterFen.value[x+1][y+1].team===this.enemy){
                    arr.push({x: x+1, y: y+1});
                }
            }
        }
        
        //TODO dodać czarnych
        
        //TODO bicie w przelocie
        return arr;
    }

    private static rookMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        //move bot
        for(let i = x+1;i<8;i++){
            if(BetterFen.value[i][y].team===2){
                arr.push({x: i, y: y});
            }else if(BetterFen.value[i][y].team===this.enemy){
                arr.push({x: i, y: y});
                break;
            }else break;
        }
        //move top
        for(let i = x-1;i>=0;i--){
            if(BetterFen.value[i][y].team===2){
                arr.push({x: i, y: y});
            }else if(BetterFen.value[i][y].team===this.enemy){
                arr.push({x: i, y: y});
                break;
            }else break;
        }
        //move right
        for(let i = y+1;i<8;i++){
            if(BetterFen.value[x][i].team===2){
                arr.push({x: x, y: i});
            }else if(BetterFen.value[x][i].team===this.enemy){
                arr.push({x: x, y: i});
                break;
            }else break;
        }
        //move left
        for(let i = y-1;i>=0;i--){
            if(BetterFen.value[x][i].team===2){
                arr.push({x: x, y: i});
            }else if(BetterFen.value[x][i].team===this.enemy){
                arr.push({x: x, y: i});
                break;
            }else break;
        }
        return arr;
    }

    private static knightMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(x+1<8 &&y-2>=0){
            if(BetterFen.value[x+1][y-2].team!==this.ally) arr.push({x: x+1, y: y-2});
        }
        if(x-1>0 &&y-2>=0){
            if(BetterFen.value[x-1][y-2].team!==this.ally) arr.push({x: x-1, y: y-2});
        }
        if(x+1<8 &&y+2<8){
            if(BetterFen.value[x+1][y+2].team!==this.ally) arr.push({x: x+1, y: y+2});
        }
        if(x-1>0 &&y+2<8){
            if(BetterFen.value[x-1][y+2].team!==this.ally) arr.push({x: x-1, y: y+2});
        }
        if(x+2<8 &&y-1>=0){
            if(BetterFen.value[x+2][y-1].team!==this.ally) arr.push({x: x+2, y: y-1});
        }
        if(x-2>0 &&y-1>=0){
            if(BetterFen.value[x-2][y-1].team!==this.ally) arr.push({x: x-2, y: y-1});
        }
        if(x+2<8 &&y+1<8){
            if(BetterFen.value[x+2][y+1].team!==this.ally) arr.push({x: x+2, y: y+1});
        }
        if(x-2>0 &&y+1<8){
            if(BetterFen.value[x-2][y+1].team!==this.ally) arr.push({x: x-2, y: y+1});
        }
        return arr;
    }
    private static bishopMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        for(let i=1;i<8;i++){
            if(x+i<8 && y+i<8) if(BetterFen.value[x+i][y+i].team===2) arr.push({x: x+i, y: y+i});
            else if(BetterFen.value[x+i][y+i].team===this.enemy){
                arr.push({x: x+i, y: y+i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x+i<8 && y-i>=0) if(BetterFen.value[x+i][y-i].team===2) arr.push({x: x+i, y: y-i});
            else if(BetterFen.value[x+i][y-i].team===this.enemy){
                arr.push({x: x+i, y: y-i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x-i>=0 && y+i<8) if(BetterFen.value[x-i][y+i].team===2) arr.push({x: x-i, y: y+i});
            else if(BetterFen.value[x-i][y+i].team===this.enemy){
                arr.push({x: x-i, y: y+i});
                break;
            }else break;
            else break;
        }
        for(let i=1;i<8;i++){
            if(x-i>=0 && y-i>=0) if(BetterFen.value[x-i][y-i].team===2) arr.push({x: x-i, y: y-i});
            else if(BetterFen.value[x-i][y-i].team===this.enemy){
                arr.push({x: x-i, y: y-i});
                break;
            }else break;
            else break;
        }
        return arr;
    }
    private static queenMoves(x:number, y:number): {x:number, y:number}[]{
        return this.bishopMoves(x,y).concat(this.rookMoves(x,y));
    }

    private static kingMoves(x:number, y:number): {x:number, y:number}[]{
        let arr:{x:number, y:number}[] = [];
        if(x+1<8){
            if(BetterFen.value[x+1][y].team!==this.ally) arr.push({x: x+1, y: y});
        }
        if(x-1>0){
            if(BetterFen.value[x-1][y].team!==this.ally) arr.push({x: x-1, y: y});
        }
        if(y+1<8){
            if(BetterFen.value[x][y+1].team!==this.ally) arr.push({x: x, y: y+1});
        }
        if(y-1>0){
            if(BetterFen.value[x][y-1].team!==this.ally) arr.push({x: x, y: y-1});
        }
        if(x+1<8 && y-1>=0){
            if(BetterFen.value[x+1][y-1].team!==this.ally) arr.push({x: x+1, y: y-1});
        }
        if(x-1>0 && y-1>=0){
            if(BetterFen.value[x-1][y-1].team!==this.ally) arr.push({x: x-1, y: y-1});
        }
        if(x+1<8 && y+1<8){
            if(BetterFen.value[x+1][y+1].team!==this.ally) arr.push({x: x+1, y: y+1});
        }
        if(x-1>0 && y+1<8){
            if(BetterFen.value[x-1][y+1].team!==this.ally) arr.push({x: x-1, y: y+1});
        }
        return arr;
    }
}