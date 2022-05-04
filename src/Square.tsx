import React from 'react';
import { ChessManager } from './ChessManager';
import { BetterFen } from "./BetterFen";
import { PostionChecker } from './PositionChecker';
let selectedSquare:number = -1;

function onClick(id:number){
    let positionChecker:PostionChecker = new PostionChecker(BetterFen.value, false);
    id--;
    const unit = BetterFen.value[Math.floor(id/8)][id%8];
    if(unit.team===(positionChecker.isWhite ? 1 : 0) && selectedSquare===-1){
        selectedSquare = id;
        console.log(positionChecker.checkMoves(Math.floor(id/8), id%8));
        
    }else if(selectedSquare!==-1){
        //TODO sprawdzanie ruchu
        
    }
}

function Square(props:any) {
    const color = (id:number, isBlack:boolean) => {
        const row:number = Math.floor((id-1)/8);
        if(row%2===0){
            if(isBlack) return "black";
            else return "white";
        }else{
            if(!isBlack) return "black";
            else return "white";
        } 
                
        
    }


    //console.log(props.team);
    const classes:string = color(props.id, props.isBlack)+" "+props.team+" "+props.piece;
    
    return <input type={"button"} id={props.id} className={classes} onClick={() => {
        onClick(props.id);
    }}></input>;
}

export default Square;