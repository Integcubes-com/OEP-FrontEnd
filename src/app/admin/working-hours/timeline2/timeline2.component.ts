import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkingCalService } from '../working-cal/working-cal.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from 'src/app/core/models/user';
import { CSites } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-timeline2',
  templateUrl: './timeline2.component.html',
  styleUrls: ['./timeline2.component.sass']
})
export class Timeline2Component extends UnsubscribeOnDestroyAdapter implements OnInit {

  //Common Variables
  errorMessage: string;
  sites: CSites[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  yearList:any[] =[];
  //Varaibles
  flattenedData: any[] = [];
  constructor(private snackBar: MatSnackBar, private dataService: WorkingCalService, public dialog: MatDialog,) { super() }

  ngOnInit(): void {
    this.getSites();
    this.getData(-1);

  }
  getData(siteId: number) {
    this.subs.sink = this.dataService.getTimeline2(-1).subscribe({
      next: data => {
        this.flattenedData = [...data];
        let maxyear = Math.max(...this.flattenedData.map(o => o.yearId))
        let minYear = Math.min(...this.flattenedData.map(o => o.yearId))
        this.yearList =[];
        let yearCounter=minYear;
        for(let i = minYear ; i<=maxyear; i++){
          this.yearList.push(yearCounter);
          yearCounter+= 1;
        }
        debugger;
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getSites() {
    this.subs.sink = this.dataService.getSites(this.user.id, -1, -1).subscribe({
      next: data => {
        this.sites = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
