import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'monthName',
})
export class MonthNamePipe implements PipeTransform {
    transform(monthNumber: any): string {
       if(monthNumber){
        const date = new Date();
        date.setMonth(+monthNumber - 1);

        console.log('Transform date:', date);

        const datePipe = new DatePipe('en-US');
        const formattedMonth = datePipe.transform(date, 'MMM');
        console.log('Formatted month:', formattedMonth);

        return formattedMonth;
       }

    }
}