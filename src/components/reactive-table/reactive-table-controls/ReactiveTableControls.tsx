import { useContext } from "react";
import { ReactiveTableContext, ReactiveTableDispatchContext } from "../reactive-table-state/reactive-table-context";

function ReactiveTableControls() {
    const state = useContext(ReactiveTableContext);
    const dispatch = useContext(ReactiveTableDispatchContext);
    if (!dispatch || !state) return;


    return (<>
        <div>
            <label htmlFor="nRows">Number of Rows (M):</label>
            <input
                onChange={(e) => {
                    const val = +e.target.value;
                    const numVal = val > 100 ? 100 : val;
                    dispatch({
                        type: 'set_rows',
                        payload: {
                            M: numVal
                        }
                    })
                }}
                value={state?.M}
                type="number" name="nRows" min={0} max={100} />

            <label htmlFor="nCols">Number of Cols (N):</label>
            <input onChange={(e) => {
                const val = +e.target.value;
                const numVal = val > 100 ? 100 : val;
                dispatch({
                    type: 'set_cols',
                    payload: {
                        N: numVal
                    }
                })
            }}
                value={state?.N}
                type="number" name="nRows" min="0" max="100" />

            <label htmlFor="xValue">
                X
            </label>
            <input
                onChange={(e) => {
                    const val = +e.target.value;
                    const numVal = val > state.M * state.N ? state.M * state.N : val;
                    dispatch({
                        type: 'set_x',
                        payload: {
                            X: numVal
                        }
                    })
                }}
                value={state.X}
                type="number" name="xValue" min="0" max={state.M * state.N} />
            <br />
            <button onClick={() => {
                dispatch({
                    type: 'append_row'
                })
            }}>Append Row</button>
        </div>
    </>);
}

export default ReactiveTableControls;