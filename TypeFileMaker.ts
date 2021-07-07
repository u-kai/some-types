import * as fs from "fs" 

export class TypeFileMaker{
    private typeNames:string[]
    constructor(typeNames:string[]){
        this.typeNames = typeNames
    }
    private headCharToSmall = (typeName:string) => {
        const head = typeName.substr(0,1).toLocaleLowerCase()
        const notHead = typeName.substr(1,typeName.length)
        return head + notHead
    }

    private createProgram = (typeName:string) => {
        const symbolName = `${this.headCharToSmall(typeName)}Nominality`
        const fileContent = `declare const ${symbolName} : unique symbol
        export type ${typeName} = string & {[${symbolName}] : never}`
        return fileContent
    }

    private writeFile = (fileName:string,fileContent) => {
        fs.writeFile(fileName,fileContent,()=>{
            console.log("success")
        })
        return
    }
    run = () => {
        this.typeNames.map(typeName=>{
            const fileContent = this.createProgram(typeName)
            const fileName = typeName + ".ts"
            this.writeFile(fileName,fileContent)
        })
    }

}