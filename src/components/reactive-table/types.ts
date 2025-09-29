export type CellId = number; // unique value for all table
export type CellValue = number; // three digit random number

export type Cell = {
  id: CellId,
  amount: CellValue
}

export type ReactiveTableContextType = {
    M: number,
    N: number,
    X: number,
    highlightedCell: Cell | null,
    tableContent: Cell[][]
}