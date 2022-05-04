import React from 'react';
import { ChessManager } from './ChessManager';
import { BetterFen } from "./BetterFen";
import { PostionChecker } from './PositionChecker';
let selectedSquare:number = -1;

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
    let classes:string = color(props.id, props.isBlack)+" "+props.team+" "+props.piece;
    if(props.isGood) {
        classes += " good";
    }
    
    return <input type={"button"} id={props.id} className={classes} onClick={() => {
        props.parentCallback(props.id)
    }}></input>;
}

export default Square;