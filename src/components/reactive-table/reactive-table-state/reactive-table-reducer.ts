import type { Cell, ReactiveTableContextType } from "../types";

type StateTransformer = (arg: ReactiveTableContextType) => ReactiveTableContextType

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTableData(M: number, N: number): Cell[][] {
    if (M === 0 || N === 0) return [];
    const tableData: Cell[][] = [];
    for (let i = 0; i < M; i++) {
        const row = [];
        for (let j = 0; j < N; j++) {
            const cell: Cell = {
                id: N * i + j,
                amount: getRandomInt(1, 100),
            }
            row.push(cell);
        }
        tableData.push(row);
    }
    return tableData;
}

export function reactiveTableReducer(state: ReactiveTableContextType, action: any) {
    const actionMapper: Record<string, StateTransformer> = {
        'set_rows': (state) => {
            return {
                ...state,
                M: action.payload.M,
                tableContent: generateTableData(action.payload.M, state.N)
            };
        },
        'set_cols': (state) => {
            return {
                ...state,
                N: action.payload.N,
                tableContent: generateTableData(state.M, action.payload.N)
            }
        },
        'set_x': (state) => {
            return {
                ...state,
                X: action.payload.X
            }
        },
        'increment_cell': (state) => {
            return {
                ...state,
                tableContent: state.tableContent.map(
                    row => row.map(
                        col => col.id === action.payload.id ? {...col, amount: col.amount + 1} : col
                    )
                )
            }
        },
        'set_highlight': (state) => {
            return {
                ...state,
                highlightedCell: action.payload
            }
        },
        'clear_highlight': (state) => {
            return {
                ...state,
                highlightedCell: null
            }
        },
        'remove_row': (state) => {
            return {
                ...state,
                M: state.M - 1,
                tableContent: state.tableContent.filter((_, idx) => idx !== action.payload.idx)
            }
        },
        'append_row': (state) => {
            const maxId = Math.max(...state.tableContent.flat().map(cell => cell.id))
            const newRow = Array.from(Array(state.N).keys()).map(i => {
                return {
                    id: maxId + i + 1,
                    amount: getRandomInt(1, 100)
                }
            })
            return {
                ...state,
                M: state.M + 1,
                tableContent: [...state.tableContent, newRow]
            }
        }
    }

    const transformer = actionMapper[action.type];
    if (!transformer) {
        return state;
    }

    return actionMapper[action.type](state);
}