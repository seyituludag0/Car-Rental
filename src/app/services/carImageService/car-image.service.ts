import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/car/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getall');
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getimagesbycarid?carId=' + carId)
  }

  add(carId:number,imageFile:File):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("carId",carId.toString());
    formData.append("Image",imageFile)

    let newPath = this.apiUrl + "carimages/add"
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }

  update(carId:number,imageFile:File, imageId:number):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("Id",imageId.toString())
    formData.append("carId",carId.toString());
    formData.append("Image",imageFile)

    let newPath = this.apiUrl + "carimages/update"
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }
}
