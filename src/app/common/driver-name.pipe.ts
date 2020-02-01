import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driverName'
})
export class DriverNamePipe implements PipeTransform {

  transform(value: any[], driverName?: string): any {

    if ( driverName && driverName.length > 0) {
      return value.filter((driver) => {
        return driver.fullName.includes(driverName);
      });
    } else {
      return value;
    }

  }

}
