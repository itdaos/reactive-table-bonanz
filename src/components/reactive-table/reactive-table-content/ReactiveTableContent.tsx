import { useContext } from "react";
import { ReactiveTableContext } from "../reactive-table-state/reactive-table-context";
import ReactiveTableRow from "./ReactiveTableRow";

function get60thPercentile(arr: number[]) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const idx = (sortedArr.length - 1) * 0.6;
    const floored = Math.floor(idx);
    if (idx == floored) {
        return sortedArr[idx];
    }
    const decimal = idx - floored;
    const diff = sortedArr[floored + 1] - sortedArr[floored];
    return sortedArr[floored] + diff * decimal;
}

function ReactiveTableContent() {
    const state = useContext(ReactiveTableContext);
    if (!state) return;

    if (state.M*state.N === 0) return;

    const highlightedCellIds = state.highlightedCell === null ? [] : state.tableContent.flat().filter(cell => cell.id !== state.highlightedCell?.id).map(cell => {
        return {
            id: cell.id,
            amount: Math.abs(cell.amount - (state.highlightedCell?.amount ?? 0))
        }
    }).sort((a, b) => {
        return a.amount - b.amount
    }).slice(0, state.X).map(cell => cell.id);


    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {
                        Array.from(Array(state.N).keys()).map((el) => {
                            return (<th key={el}>{el + 1}</th>);
                        })
                    }
                    <th>Sum</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.tableContent.map((row, idx) => {
                        return (<ReactiveTableRow key={idx} idx={idx} row={row} highlightedCellIds={highlightedCellIds} ></ReactiveTableRow>);
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td>60th %ile</td>
                    {
                        Array.from(Array(state.N).keys()).map((el) => {
                            return (<td key={el}>{
                                get60thPercentile(state.tableContent.map(row => row[el].amount)).toFixed(2)
                            }</td>);
                        })
                    }
                    <td></td>
                </tr>
            </tfoot>
        </table>
    );
}

export default ReactiveTableContent;