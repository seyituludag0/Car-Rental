import { Car } from 'src/app/models/car/car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from 'src/app/models/car/carImage';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { CarDetail } from 'src/app/models/car/carDetail';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44357/api/';
  constructor(private httpClient: HttpClient) {}

  getCarsDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsdetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/brandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + `cars/getcarsbybrandandcolor?brandId=${brandId}&colorId=${colorId}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

 getCarDetails(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetail?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailbycolorid?colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarImage(carId:number):Observable<SingleResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getimagesbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<CarImage>>(newPath)
  }


  add(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car)
  }


  update(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car)
  }

}

