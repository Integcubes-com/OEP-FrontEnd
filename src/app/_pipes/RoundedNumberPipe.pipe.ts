import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedNumber'
})
export class RoundedNumberPipe implements PipeTransform {
  transform(value: number, decimalPlaces: number = 2): string {
    if (isNaN(value)) {
      return '-';
    }

    const roundedValue = parseFloat(value.toFixed(decimalPlaces));
    const formattedValue = roundedValue.toLocaleString();

    return formattedValue;
  }
}