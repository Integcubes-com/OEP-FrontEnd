import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-cols',
  templateUrl: './table-cols.component.html',
  styleUrls: ['./table-cols.component.sass']
})
export class TableColsComponent  {
  dialogTitle:string="Selected Columns";
  allCols:any[]=[
    {colName:"tilNumber",code:"Til Number", isSelected:false},
    {colName:"alternateNumber",code:"Alternate Number", isSelected:false},
    {colName:"applicabilityNotes",code:"Applicability Notes", isSelected:false},
    {colName:"tilTitle",code:"TIL Title", isSelected:false},
    {colName:"currentRevision",code:"Current Revision", isSelected:false},
    {colName:"tilFocusTitle",code:"TIL Focus/Severity", isSelected:false},
    {colName:"documentTypeTitle",code:"Document Type", isSelected:false},
    {colName:"oem",code:"OEM", isSelected:false},
    {colName:"oemSeverityTitle",code:"OEM Severity", isSelected:false},
    {colName:"oemTimingTitle",code:"OEM Timing", isSelected:false},
    {colName:"reviewForumtitle",code:"Review Forum", isSelected:false},
    {colName:"recommendations",code:"Recommendations", isSelected:false},
    {colName:"technicalReviewSummary",code:"Technical Review", isSelected:false},
    {colName:"dateReceivedNomac",code:"Date Received Nomac", isSelected:false},
    {colName:"dateIssuedDocument",code:"Date Issued Document", isSelected:false},
    {colName:"reviewStatusTitle",code:"Review Status", isSelected:false},
    {colName:"notes",code:"Notes", isSelected:false},
    {colName:"sourceTitle",code:"Source", isSelected:false},
    {colName:"componentTitle",code:"Component", isSelected:false},
    {colName:"implementationNotes",code:"Implementation Notes", isSelected:false},
    {colName:"yearOfIssue",code:'Year Of Issue', isSelected:false},
    {colName:"tbTitle",code:'Equipment Type', isSelected:false},

  ];
  selectedCols:any[]=[];

  constructor(
    public dialogRef: MatDialogRef<TableColsComponent>,
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
