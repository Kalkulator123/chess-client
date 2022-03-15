import React from 'react';
import Square from './Square';
import {BetterFen} from './BetterFen';

function Board(props:any) {
    let arr = [];
    let a = 0;
    for(let i = 0;i<8;i++){
        for(let j = 0;j<8;j++){
            a++;
            //ReactDOM.render(<Square id={i}/>, document.getElementById("board"));
            const piece = BetterFen.getPiece(i,j);
            const team = BetterFen.getTeam(i,j);
            arr.push(<Square id={a} isBlack={a%2===0} team={team} piece={piece}/>);
        }
    }

    return(
        <div id="board">
            {arr}
        </div>
    )
}

export default Board;