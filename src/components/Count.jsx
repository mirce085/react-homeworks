import React, {useContext} from "react";
import {Context} from "../App";

export function Count(){
    const context = useContext(Context);

    return (
        <span>{context.value}</span>
    )
}