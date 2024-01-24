import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-columns',
  templateUrl: './add-columns.component.html',
  styleUrls: ['./add-columns.component.sass']
})
export class AddColumnsComponent {

  dialogTitle:string="Selected Columns";
  allCols:any[]=[


    {colName:"siteTitle",code:"Site", isSelected:false},
    {colName:"regionTitle",code:"Region", isSelected:false},
    {colName:"referenceNumber",code:"Reference Number", isSelected:false},
    {colName:"title",code:"Title", isSelected:false},
    {colName:"insuranceRecommendation",code:"Insurance Recommendation", isSelected:false},
    {colName:"nomacStatusTitle",code:"Nomac Status", isSelected:false},
    {colName:"insurenceStatusTitle",code:"Insurence Status", isSelected:false},
    {colName:"priorityTitle",code:"Priority", isSelected:false},
    {colName:"targetDate",code:"Target Date", isSelected:false},
    {colName:"proactiveTitle",code:"Proactive", isSelected:false},
    {colName:"sourceTitle",code:"Source", isSelected:false},
    {colName:"year",code:"Year", isSelected:false},
    {colName:"type",code:"Type", isSelected:false},
    {colName:"report",code:"Report", isSelected:false},
    {colName:"cluster",code:"Cluster", isSelected:false},
    // {colName:"actions", isSelected:false},

    

    
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
