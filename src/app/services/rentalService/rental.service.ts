
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44357/api/'
  constructor(private httpClient: HttpClient) {}

  getRentals():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental)

  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetailByCustomerId(customerId:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "rentals/getrentaldetailbycustomerid?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath)
  }



}
