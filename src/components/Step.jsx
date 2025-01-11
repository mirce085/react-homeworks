import React, {useContext} from "react";
import {Context} from "../App";

export function Step(){
    const context = useContext(Context);

    return (
        <div>
            <button onClick={() => context.dispatch({type: "stepIncrement"})}>+</button>
            <button onClick={() => context.dispatch({type: "stepDecrement"})}>-</button>
            <span>{context.stepValue}</span>
        </div>
    )
}