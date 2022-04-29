import React from "react";

export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }
    return (
        <div className="dice--div">
            <button 
            className="dice--button" 
            style={styles} 
            onClick={props.holdDice}>
                {props.value}
            </button>
        </div>
    );
}