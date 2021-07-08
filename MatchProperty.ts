declare const matchPropertyNominality : unique symbol
export type MatchProperty = string & {[matchPropertyNominality] : never}
export class MatchPropertyProvider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    
    createNew = ():MatchProperty => {
        return this.value as MatchProperty
    }
}
