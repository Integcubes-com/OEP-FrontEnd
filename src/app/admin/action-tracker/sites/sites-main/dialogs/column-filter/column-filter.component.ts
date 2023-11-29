import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.sass']
})
export class ColumnFilterComponent {

  dialogTitle:string="Selected Columns";
  allCols: any[] = [
    { colName: "siteName",code:'Site Name', isSelected: false },
    { colName: "country",code:'Country', isSelected: false },
    { colName: "region",code:'Region', isSelected: false },
    { colName: "projectCompany",code:'Project Company', isSelected: false },
    { colName: "siteDescription",code:'Site Description', isSelected: false },
    { colName: "projectStatus",code:'Project Status', isSelected: false },
    { colName: "projectCOD",code:'Project COD', isSelected: false },
    { colName: "onmContractExpiry",code:'ONM Contract Expiry', isSelected: false },
    { colName: "sitePGMName",code:'Site PGM Name', isSelected: false },
    { colName: "insurancePOC",code:'Insurance POC',isSelected: false },
    { colName: "insuranceSummary",code:'Insurance Summary', isSelected: false },
    { colName: "tilsSummary",code:'Tils Summary', isSelected: false },
    { colName: "clusterTitle",code:'Cluster', isSelected: false },
    { colName: "siteEMO",code:'Site EMO', isSelected: false },
    { colName: "s4hanaCode",code:'s4hanaCode', isSelected: false },
    { colName: "projectName",code:'Project Name', isSelected: false },
    { colName: "onmName",code:'ONM Name', isSelected: false },
    { colName: "tilPOC",code:'TIL POC', isSelected: false },
  ];
  selectedCols:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<ColumnFilterComponent>,
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
