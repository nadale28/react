import React, {createContext, useMemo, useReducer} from "react";
import Table from "../7틱택토/Table";
import Form from "./Form";

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

export const START_GAME = 'START_GAME';

const initialState = {
    tableData : [],
    timer: '',
    result: '',
}

const reducer = (state, action) => {
    switch (action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            };
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(()=>({tableData: state.tableData, dispatch}), [state.tableData])
    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>

    );
}

export default MineSearch;