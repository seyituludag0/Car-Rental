import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  currentCustomer:string = "currentCustomer";
  constructor() { }

  get(key:string){
    var result = localStorage.getItem(key);
    if (result) {
      return result
    } else {
      return undefined
    }

  }

  add(key:string,value:string) {
    return localStorage.setItem(key,value)
  }

  delete(key:string){
    return localStorage.removeItem(key);
  }

  clear(){
    return localStorage.clear();
  }






}
