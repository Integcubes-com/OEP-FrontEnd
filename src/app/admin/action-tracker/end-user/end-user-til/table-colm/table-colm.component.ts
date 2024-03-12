import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-table-colm',
  templateUrl: './table-colm.component.html',
  styleUrls: ['./table-colm.component.sass']
})
export class TableColmTilComponent {
  userZ: User = JSON.parse(localStorage.getItem('currentUser'));

  dialogTitle:string="Selected Columns";
  allCols:any[]=[
    {colName:"siteTitle",code:"Site", isSelected:false},
    {colName:"regionTitle",code:"Region", isSelected:false},
    {colName:"tilNumber",code:"TIL Number", isSelected:false},
    {colName:"tilAction",code:"TIL Action", isSelected:false},
    {colName:"siteEquipmentTitle",code:"Site Equipment", isSelected:false},
    {colName:"tilDescription",code:"TIL Description", isSelected:false},
    {colName:"targetDate",code:"Target Date", isSelected:false},
    {colName:"daysToTarget",code:"Days To Target", isSelected:false},
    {colName:"statustitle",code:"Status", isSelected:false},
    {colName:"assignedToTitle",code:"Assigned To", isSelected:false},
    {colName:"evidenceTitle",code:"Evidence", isSelected:false},
    {colName:"focusTitle",code:"Focus/Severity", isSelected:false},
    {colName:"oemSeverityTitle",code:"OEM Severity", isSelected:false},
    {colName:"priorityTitle",code:"Priority", isSelected:false},
    {colName:"cluster",code:"Cluster", isSelected:false},
    {colName:"unitStatus",code:"Unit Status", isSelected:false},
    {colName:"finalImplementationTitle",code:"Final Implementation", isSelected:false},
    {colName:"planningTitle",code:"SAP Planning", isSelected:false},
    {colName:"timingCode",code:"Timing Code", isSelected:false},
    {colName:"tilTitle",code:"Til Title", isSelected:false},
    {colName:"adminComment",code:"Admin Comment", isSelected:false},
    {colName:"tbTitle",code:'Equipment Type', isSelected:false},
    {colName:"actionClosedTitle",code:"Action Closed By", isSelected:false},
    {colName:"actionClosureDate",code:"Action Closure Date", isSelected:false},


    
  ];
  selectedCols:any[]=[];

  constructor(
    public dialogRef: MatDialogRef<TableColmTilComponent>,
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
    const index2 = this.selectedCols.indexOf('report');
    if(index2 !== -1){
      this.selectedCols.splice(index2,1);
      this.selectedCols.push('report')
    }
    const index1 = this.selectedCols.indexOf('actions');
    if(index1 !== -1){
      this.selectedCols.splice(index1,1);
      this.selectedCols.push('actions')
    }

    
  //  this.selectedCols.push("actions");
    this.dialogRef.close(this.selectedCols)
  }

}
