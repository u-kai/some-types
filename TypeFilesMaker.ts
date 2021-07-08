import * as fs from "fs" 
import * as path from "path"
export class TypeFilesMaker{
    private typeFileInfos:{typeName:string,regExp:RegExp}[]
    private relativePath?:string
    
    constructor(typeFileInfos:{typeName:string,regExp:RegExp}[],relativePath?:string){
        this.typeFileInfos = typeFileInfos
        this.relativePath = relativePath
    }
    private headCharToSmall = (typeName:string) => {
        const head = typeName.substr(0,1).toLocaleLowerCase()
        const notHead = typeName.substr(1,typeName.length)
        return head + notHead
    }

    private createProgram = (typeName:string,regExp:RegExp) => {
        const symbolName = `${this.headCharToSmall(typeName)}Nominality`
        const fileContent = `declare const ${symbolName} : unique symbol
export type ${typeName} = string & {[${symbolName}] : never}
export class ${typeName}Provider {
    private value:string
    constructor(value:string){
        this.value = value
    }
    private is${typeName} = (value:string):value is ${typeName} => {
        return ${regExp.toString()}.test(value) 
    }
    createNew = ():${typeName} => {
        if(this.is${typeName}(this.value)){
            return this.value
        }else{
            throw new Error("Type Error. This Value is not ${typeName}")
        }
    }
}
`
        return fileContent
    }

    private writeFile = (fileName:string,fileContent:string) => {
        fs.writeFile(fileName,fileContent,()=>{
            console.log("success",fileName)
        })
        return
    }
    writeFiles = () => {
        this.typeFileInfos.map(typeFileInfo=>{
            const fileContent = this.createProgram(typeFileInfo.typeName,typeFileInfo.regExp)
            const fileName = this.relativePath ? path.resolve(this.relativePath,typeFileInfo.typeName + ".ts") : typeFileInfo.typeName + ".ts"
            this.writeFile(fileName,fileContent)
        })
    }
}

const tfm = new TypeFilesMaker([
    {
        typeName:"CellIndex",regExp:new RegExp("^[A-Z]+[1-9]+$")
    },
    {
        typeName:"CellColumnIndex",regExp:new RegExp("[^A-Z]+$")
    },
    {
        typeName:"CellRowIndex",regExp:new RegExp("^[1-9]+$")
    },
])
tfm.writeFiles()