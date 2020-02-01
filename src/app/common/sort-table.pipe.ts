import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTable'
})
export class SortTablePipe implements PipeTransform {

  transform(value: any, tableSort: any): any {

    let acc = 1;
    if (!tableSort.order) {
      acc = -1;
    }

    value.sort( ( a, b ) => {
      if ( a[tableSort.attribute] < b[tableSort.attribute] ) {
        if (tableSort.order) {
          return -1;
        } else {
          return 1;
        }
      }
      if ( a[tableSort.attribute] > b[tableSort.attribute] ) {
        if (tableSort.order) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
    return value;
  }


}
