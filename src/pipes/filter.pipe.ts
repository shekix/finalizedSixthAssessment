import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filter: string): any[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: any) => {
      const firstName =
        value.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const lastName =
        value.lastName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (firstName || lastName) {
        return value;
      }
    });
  }

}
