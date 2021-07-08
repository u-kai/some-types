declare const cellIndexNominality : unique symbol
export type CellIndex = string & {[cellIndexNominality] : never}
export class CellIndexProvider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    private isCellIndex = (value:string):value is CellIndex => {
        return /^[A-Z]+[1-9]+$/.test(value) 
    }
    createNew = ():CellIndex => {
        if(this.isCellIndex(this.value)){
            return this.value
        }else{
            throw new Error("Type Error. This Value is not CellIndex")
        }
    }
}
