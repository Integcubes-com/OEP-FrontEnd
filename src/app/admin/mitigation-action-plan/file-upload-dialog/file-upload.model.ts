export interface ReturnedDocumnet {
    evidenceId: number
    actionId: number
    technologyId: number
    siteId: number
    name: string
    remarks: string
    path: string
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