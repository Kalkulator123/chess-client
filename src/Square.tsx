import React from 'react';

function Square(props:any) {
    const color = (id:number, isBlack:boolean) => {
        const row:number = Math.floor((id-1)/8);
        if(row%2==0){
            if(isBlack) return "black";
            else return "white";
        }else{
            if(!isBlack) return "black";
            else return "white";
        } 
                
        
    }
    
    return <div id={props.id} className={color(props.id, props.isBlack)}></div>;
}

export default Square;