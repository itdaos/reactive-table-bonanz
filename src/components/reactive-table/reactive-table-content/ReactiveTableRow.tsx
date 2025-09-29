import { useContext, useState } from "react";
import type { Cell } from "../types";
import ReactiveTableCell from "./ReactiveTableCell";
import { ReactiveTableDispatchContext } from "../reactive-table-state/reactive-table-context";

type RowProps = {
    idx: number,
    row: Cell[],
    highlightedCellIds: number[]
}

function ReactiveTableRow(props: RowProps) {
    const dispatch = useContext(ReactiveTableDispatchContext);
    if (!dispatch) return;

    const sum = props.row.reduce((prev, curr) => (prev + curr.amount), 0);
    const maxValue = Math.max(...props.row.map(col => col.amount))
    const [percentageMode, setPercentageMode] = useState(false);

    return (
        <tr key={props.idx}>
            <th>{props.idx + 1}</th>
            {
                props.row.map(col => {
                    const isHovered = props.highlightedCellIds.includes(col.id);
                    return <ReactiveTableCell
                        key={col.id}
                        percentageMode={percentageMode}
                        rowMax={maxValue}
                        rowSum={sum}
                        isHovered={isHovered}
                        {...col} >
                    </ReactiveTableCell>
                })
            }
            <th
                onMouseEnter={() => {
                    setPercentageMode(true);
                }}
                onMouseLeave={() => {
                    setPercentageMode(false);
                }}
            >
                {sum}
            </th>
            <th>
                <button onClick={() => {
                    dispatch({
                        type: 'remove_row',
                        payload: {
                            idx: props.idx
                        }
                    })
                }} color="red">X</button>
            </th>
        </tr>)
}

export default ReactiveTableRow;