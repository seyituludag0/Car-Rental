import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from 'src/app/models/car/carDetail';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from 'src/app/models/car/carImage';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) {}

  getCarDetail(carId: number): Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetail?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcarsdetail?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getimagesbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImage(carId:number):Observable<SingleResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getimagesbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<CarImage>>(newPath)
  }
}
