import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oMExcludePipe'
})
export class OMExcludePipePipe implements PipeTransform {

  transform(items: any[], exludeId: number): any[] {
    if(!items || !exludeId ){
      return items
    }
    return items.filter(item=>item.statusId != 5);
  }

}
