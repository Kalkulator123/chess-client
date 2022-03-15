import React from 'react';
import Square from './Square';

function Board(props:any) {
    let arr = [];
    for(let i = 1;i<=64;i++){
           //ReactDOM.render(<Square id={i}/>, document.getElementById("board"));
           arr[i]=<Square id={i} isBlack={i%2==0}/>;
    }

    return(
        <div id="board">
            {arr}
        </div>
    )
}

export default Board;