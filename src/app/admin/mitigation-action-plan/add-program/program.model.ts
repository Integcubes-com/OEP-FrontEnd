export class OMA_program {
    programId: number;
    programTitle: string;
    isSelected:boolean = false;
    constructor(reg) {
        this.programId = reg.programId ? reg.programId : -1;
    }
}
export interface submitProgramObj{
    program:OMA_program;
    technologiesSubmit:OMA_Technology[];
}
export class OMA_Technology{
    technologyId:number;
    technologyTitle:string;
}