import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
  name: 'unique2',
  pure: false
})

export class UniquePipe2 implements PipeTransform {
    transform(value: any, property: string): any {
        if (value !== undefined && value !== null) {
          return _.uniqBy(value, property);
        }
        return value;
      }
}
