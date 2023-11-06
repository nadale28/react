import React, {useCallback, useContext, useState} from "react";
import {START_GAME, TableContext} from "./MineSearch";

const Form = () => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext);

    const onChageRow = useCallback((e) => {
        setRow(e.target.value);
    },[]);

    const onChageCell = useCallback((e) => {
        setRow(e.target.value);
    },[]);

    const onChageMine = useCallback((e) => {
        setRow(e.target.value);
    },[]);

    const onClickBtn = useCallback((e)=>{
        dispatch({type: START_GAME, row, cell, mine })
    },[row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChageRow}/>
            <input type="number" placeholder="가로" value={cell} onChange={onChageCell}/>
            <input type="number" placeholder="지뢰" value={mine} onChange={onChageMine}/>
            <button></button>
        </div>
    );
}

export default Form;