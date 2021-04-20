import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44357/api/';

  getBrands():Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getall"
     return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrand(id:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl + "brands/getbrandbyid?brandId=" + id)
  }

  add(brand:Brand):Observable<ResponseModel>{
  return  this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add",brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/update", brand)
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete"
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)
  }

}
