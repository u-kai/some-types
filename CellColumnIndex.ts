declare const cellColumnIndexNominality : unique symbol
export type CellColumnIndex = string & {[cellColumnIndexNominality] : never}
export class CellColumnIndexProvider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    private isCellColumnIndex = (value:string):value is CellColumnIndex => {
        return /[^A-Z]+$/.test(value) 
    }
    createNew = ():CellColumnIndex => {
        if(this.isCellColumnIndex(this.value)){
            return this.value
        }else{
            throw new Error("Type Error. This Value is not CellColumnIndex")
        }
    }
}
