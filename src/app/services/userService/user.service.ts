import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserModel } from 'src/app/models/userModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44357/api/';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  update(userModel: UserModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/updateinfo';
    return this.httpClient.post<ResponseModel>(newPath, userModel);
  }

  getById(id: number): Observable<SingleResponseModel<UserModel>> {
    this.authService.isAuthenticated();
    let newPath = this.apiUrl + 'users/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);
  }


  getUserFindexByUserId(userId:number):Observable<SingleResponseModel<UserModel>>{
    let newPath = this.apiUrl + "users/getuserfindexbyuserId?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath)
  }

  updateUserFindex(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/updateuserfindex?id="+userId;
    return this.httpClient.post<ResponseModel>(newPath,userId);
  }
}

