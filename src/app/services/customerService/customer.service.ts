import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl="https://localhost:44357/api/"
  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newUrl = this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl)
  }

  listCustomer(userId:number){
    let newUrl = this.apiUrl + "customers/getcustomerbyuserid?id=" + userId
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl)
  }

  getCustomerByUserId(userId:number){
    let newUrl = this.apiUrl + "customers/getcustomerbyuserid?id=" + userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newUrl)
  }

  add(customer:Customer):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "customers/add";
    return this.httpClient.post<ResponseModel>(newUrl,customer)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newUrl,customer);
  }
}
