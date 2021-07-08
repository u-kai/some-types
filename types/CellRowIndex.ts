declare const cellRowIndexNominality : unique symbol
export type CellRowIndex = string & {[cellRowIndexNominality] : never}
export class CellRowIndexProvider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    private isCellRowIndex = (value:string):value is CellRowIndex => {
        return /^[1-9]+$/.test(value) 
    }
    createNew = ():CellRowIndex => {
        if(this.isCellRowIndex(this.value)){
                return this.value
            }else{
                throw new Error("Type Error. This Value is not CellRowIndex") 
            }
        }
}
