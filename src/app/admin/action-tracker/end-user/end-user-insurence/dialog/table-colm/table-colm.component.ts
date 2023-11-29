import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-colm',
  templateUrl: './table-colm.component.html',
  styleUrls: ['./table-colm.component.sass']
})
export class TableColmComponent {

  dialogTitle:string="Selected Columns";
  allCols:any[]=[
    // {colName:"assignedToTitle", isSelected:false},
    // {colName:"statusTitle", isSelected:false},
    // {colName:"statusScore", isSelected:false},
    // {colName:"companyTitle", isSelected:false},
    // {colName:"comments", isSelected:false},
    // {colName:"closureDate", isSelected:false},
    // {colName:"evidenceAvailableScore", isSelected:false},
    // {colName:"dayStatusTitle", isSelected:false},
    // {colName:"dayStatusScore", isSelected:false},
    // {colName:"calcStatus", isSelected:false},
    // {colName:"calcEvid", isSelected:false},
    // {colName:"calcDate", isSelected:false},
    // {colName:"completionScore", isSelected:false},
    // {colName:"scoreDetails", isSelected:false},
    
    {colName:"siteTitle",code:"Site", isSelected:false},
    {colName:"closureDate",code:"Closure Date", isSelected:false},
    {colName:"comments",code:"Comments", isSelected:false},

    
    {colName:"regionTitle",code:"Region", isSelected:false},
    {colName:"recommendationReference",code:"Recommendation Reference", isSelected:false},
    {colName:"recommendationTitle",code:"Recommendation", isSelected:false},
    {colName:"action",code:"Action", isSelected:false},
    // {colName:"insurenceStatusTitle", isSelected:false},
    // {colName:"nomacStatusTitle", isSelected:false},
    {colName:"priorityTitle",code:"Priority", isSelected:false},
    {colName:"targetDate",code:"Target", isSelected:false},
    {colName:"daysToTarget",code:"Days To Target", isSelected:false},
    {colName:"statusTitle",code:"Status", isSelected:false},
    {colName:"assignedToTitle",code:"Assigned To", isSelected:false},
    {colName:"sourceTitle",code:"Source", isSelected:false},
    {colName:"evidenceAvailable",code:"Evidence Available", isSelected:false},
    {colName:"documentTypeTitle",code:"Document Type", isSelected:false},
    {colName:"type",code:"type", isSelected:false},
    // {colName:"actions", isSelected:false},

    

    
  ];
  selectedCols:any[]=[];

  constructor(
    public dialogRef: MatDialogRef<TableColmComponent>,
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
