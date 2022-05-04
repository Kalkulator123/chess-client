import React, { useState, useEffect } from 'react';
import Square from './Square';
import {BetterFen} from './BetterFen';
import { PostionChecker } from './PositionChecker';

function Board(props:any) {
    const [selectedSquare , setSelectedSquare] = useState(-1);
    let positions = [{x: -1, y:-1}];
    let arr = [];

    const updateSelectedSquare = (selectedItem: any) => {
        setSelectedSquare(selectedItem);
        generateLegalMoves(selectedItem);

        for(let i = 0;i<8;i++){
            for(let j = 0;j<8;j++){
                a++;
                //ReactDOM.render(<Square id={i}/>, document.getElementById("board"));
                const piece = BetterFen.getPiece(i,j);
                const team = BetterFen.getTeam(i,j);

                positions.forEach(position => {
                    if(j == position.x
                    && i == position.y) {
                        arr.push(<Square id={a} isGood={true} isBlack={a%2===0} team={team} piece={piece} parentCallback={updateSelectedSquare}/>);
                    } else {
                        arr.push(<Square id={a} isBlack={a%2===0} team={team} piece={piece} parentCallback={updateSelectedSquare}/>);
                    }
                });
            }
        }
    };

    const generateLegalMoves = (id: number) => {
        let positionChecker:PostionChecker = new PostionChecker(BetterFen.value, false);
        id--;
        const unit = BetterFen.value[Math.floor(id/8)][id%8];
        if(unit.team===(positionChecker.isWhite ? 1 : 0) && selectedSquare===-1){
            setSelectedSquare(id);
            positions = positionChecker.checkMoves(Math.floor(id/8), id%8);
            console.log(positions);
        }else if(selectedSquare!==-1){
            //TODO sprawdzanie ruchu  
        }
    };

    let a = 0;
    for(let i = 0;i<8;i++){
        for(let j = 0;j<8;j++){
            a++;
            //ReactDOM.render(<Square id={i}/>, document.getElementById("board"));
            const piece = BetterFen.getPiece(i,j);
            const team = BetterFen.getTeam(i,j);
            arr.push(<Square id={a} isBlack={a%2===0} team={team} piece={piece} parentCallback={updateSelectedSquare}/>);
        }
    }

    return(
        <div id="board">
            {arr}
        </div>
    )
}

export default Board;