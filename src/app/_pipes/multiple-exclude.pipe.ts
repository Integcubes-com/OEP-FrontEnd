import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MultipleExclude'
})
export class MultipleExclude implements PipeTransform {

  transform(items: any[], excludeIds: number[]): any[] {
    if (!items || !excludeIds || excludeIds.length === 0) {
      return items;
    }

    return items.filter(item => !excludeIds.includes(item.statusId));
  }

}