import { CarDetail } from 'src/app/models/car/carDetail';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCar',
})
export class FilterCarPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (car: CarDetail) =>
            car.modelName.toLocaleLowerCase().indexOf(filterText.toString()) !==
            -1
        )
      : value;
  }
}
