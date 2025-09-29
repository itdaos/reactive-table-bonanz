import { useReducer } from "react";
import ReactiveTableContent from "./reactive-table-content/ReactiveTableContent";
import ReactiveTableControls from "./reactive-table-controls/ReactiveTableControls";
import { ReactiveTableContext, ReactiveTableDispatchContext } from "./reactive-table-state/reactive-table-context";
import { reactiveTableReducer } from "./reactive-table-state/reactive-table-reducer";
import { REACT_TABLE_DEFAULT_STATE } from "./constants";

function ReactiveTable() {
    const [state, dispatch] = useReducer(reactiveTableReducer, REACT_TABLE_DEFAULT_STATE)

    return (
        <ReactiveTableContext value={state}>
            <ReactiveTableDispatchContext value={dispatch}>
                <ReactiveTableControls></ReactiveTableControls>
                <ReactiveTableContent></ReactiveTableContent>
            </ReactiveTableDispatchContext>
        </ReactiveTableContext>
    );
}

export default ReactiveTable;