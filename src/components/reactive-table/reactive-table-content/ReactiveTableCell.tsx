import { useContext } from "react";
import { ReactiveTableDispatchContext } from "../reactive-table-state/reactive-table-context";

type TableCellProps = {
    id: number,
    amount: number,
    isHovered: boolean,
    percentageMode?: boolean,
    rowMax: number,
    rowSum: number,
}

function ReactiveTableCell(props: TableCellProps) {
    const dispatch = useContext(ReactiveTableDispatchContext);
    if (!dispatch) return;

    if (props.percentageMode) {
        const chartPercent = +(props.amount / props.rowMax * 100).toFixed(0);
        return (<td
            key={props.id}
            style={{
                background: `linear-gradient(0deg, rgba(200, 200, 100, 0.3) ${chartPercent}%, rgba(200, 200, 100, 0) ${chartPercent}%)`,
            }}
        >
            {(props.amount / props.rowSum * 100).toFixed(0)}%
        </td>)
    }

    return (<td
        onClick={() => {
            dispatch({
                type: 'increment_cell',
                payload: {
                    id: props.id
                }
            })
        }}
        onMouseEnter={
            () => {
                console.log('test');
                dispatch({
                    type: 'set_highlight',
                    payload: {
                        ...props
                    }
                })
            }
        }
        onMouseLeave={
            () => {
                dispatch({
                    type: 'clear_highlight'
                })
            }
        }
        key={props.id}
        data-id={props.id}
        className={props.isHovered ? 'highlight' : ''}
    >
        {props.amount}
    </td>);
}

export default ReactiveTableCell;