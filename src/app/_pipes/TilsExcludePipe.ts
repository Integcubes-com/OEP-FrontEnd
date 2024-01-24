import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TilExclude'
})
export class TilExcludePipe implements PipeTransform {


    transform(items: any[], excludeIds: number[], currentId:number): any[] {
        if (!items || !excludeIds || excludeIds.length === 0 || excludeIds.includes(currentId)) {
          return items;
        }
    
        return items.filter(item => !excludeIds.includes(item.statusId));
      }

}