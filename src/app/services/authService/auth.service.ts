import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../localStrogeService/local-storage.service';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PasswordChangeModel } from 'src/app/models/passwordChangeModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44357/api/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  userName: string;
  userId:number;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.setUserId()
  }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'auth/login',
      loginModel
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }

  setUserName() {
    var decoded = this.jwtHelper.decodeToken(
      this.localStorageService.get('token')
    );
    var propUserName = Object.keys(decoded).filter((x) =>
      x.endsWith('/name')
    )[0];
    this.userName = decoded[propUserName];
  }

  setUserId() {
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"))
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId(){
    return this.userId;
  }

  changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "auth/changePassword"
    return this.httpClient.post<ResponseModel>(newUrl,passwordChangeModel)
  }

}
