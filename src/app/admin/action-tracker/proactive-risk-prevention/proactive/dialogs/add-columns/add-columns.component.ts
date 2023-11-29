import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-columns',
  templateUrl: './add-columns.component.html',
  styleUrls: ['./add-columns.component.sass']
})
export class AddColumnsComponent {

  dialogTitle:string="Selected Columns";
  allCols: any[] = [
    { colName: "proactiveReference",code:'Proactive Reference', isSelected: false },
    { colName: "proactivetitle",code:'Proactive', isSelected: false },
    { colName: "recommendations",code:'Recommendations', isSelected: false },
    { colName: "guidelines",code:'Guidelines', isSelected: false },
    { colName: "auditPreperatoryChecklist",code:'Audit Preperatory', isSelected: false },
    { colName: "criticalityTitle",code:'Criticality', isSelected: false },
    { colName: "categoryTitle",code:'Category', isSelected: false },
    { colName: "exposureTitle",code:'Exposure', isSelected: false },
    { colName: "sourceTitle",code:'Source', isSelected: false },
    { colName: "themeTitle",code:'Theme',isSelected: false },
    { colName: "sites",code:'Sites', isSelected: false },
  ];
  selectedCols:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<AddColumnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selectedCols = [...this.data.column];
    // let j = this.selectedCols.indexOf("actions")
    // this.selectedCols.splice(j,1)
    this.selectedCols.map(a=>{
      let i = this.allCols.findIndex(b => b.colName == a)
      if(i>-1){
       this.allCols[i].isSelected=true;
      }
    })
  }
  userAction(event, colName: string) {
    let i = this.selectedCols.indexOf(colName);
    if (i > -1) {
      this.selectedCols.splice(i, 1)
    }
    else {
      this.selectedCols.push(colName)
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  submit(){
    const index1 = this.selectedCols.indexOf('actions');
    if(index1 !== -1){
      this.selectedCols.splice(index1,1);
      this.selectedCols.push('actions')
    }
    this.dialogRef.close(this.selectedCols)
  }
}
