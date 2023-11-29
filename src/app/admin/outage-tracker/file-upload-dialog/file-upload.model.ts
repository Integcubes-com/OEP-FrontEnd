export interface ReturnedDocumnet {
    name: string
    remarks: string
    filePath: string
    id: number
    docId: number
}
export interface ReturnedDocumnetTil {
    name: string
    remarks: string
    filePath: string
    tapId: number
    equipId:number
    docId: number
}
export class DocumnetUpload{
    name: string
    remarks: string
    file: File
    constructor(reg){
        this.name = reg.name?reg.name:null
        this.remarks = reg.remarks?reg.remarks:null
        this.file = reg.file?reg.file:null
    }
}