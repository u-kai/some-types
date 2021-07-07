declare const cellRowIndexNominality:unique symbol

export type CellRowIndex = string & {[cellRowIndexNominality]:never}
//"3","27"

export const isCellRowIndex = (value:string):value is CellRowIndex=>{
    return /^[1-9]+$/.test(value) 
}