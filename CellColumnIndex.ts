declare const cellColumnIndexNominality:unique symbol

export type CellColumnIndex = string & {[cellColumnIndexNominality]:never}
//"A","AA","AB"

export const isCellColumnIndex = (value:string):value is CellColumnIndex => {
    return /[^A-Z]+&/.test(value)    
}