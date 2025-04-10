import React from "react";
export default function CartItem(props) {

    return (
        <>
            <div className="flex gap-5 pt-3">
                <h3 className="text-5xl font-bold">{props.name}</h3>
                <button className="text-4xl border-1 rounded-4xl w-8 h-11 text-center cursor-pointer" onClick={props.handleDec}>-</button>
                <p className="text-4xl">{props.count}</p>
                <button className="text-4xl border-1 rounded-4xl w-8 h-11 text-center cursor-pointer" onClick={props.handleInc}>+</button>
                <button className="text-1xl border-1 border-red-600 bg-red-500 rounded-4xl w-8 h-11 text-center cursor-pointer" onClick={props.handleDel}>del</button>
            </div>
        </>
    )
}