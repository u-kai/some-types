declare const displayPropertyNominality : unique symbol
export type DisplayProperty = string & {[displayPropertyNominality] : never}
export class DisplayPropertyProvider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    
    createNew = ():DisplayProperty => {
        return this.value as DisplayProperty
    }
}
