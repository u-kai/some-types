declare const cellIndexNominality:unique symbol

export type CellIndex = string & {[cellIndexNominality]:never}

export const isCellIndex = (value:string):value is CellIndex => {
    return /^[A-Z]+[1-9]+&/.test(value)
}