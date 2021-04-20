import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private mailApi = 'https://formspree.io/f/mjvjkygv'

  constructor(private http: HttpClient) { }

  postMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' })
      .pipe(
        map(
          (response) => {
            if (response) {
              return response;
            }
            else{
              return 'Benim yazdığım hata'
            }
          },
          (error: any) => {
            return error;
          }
        )
      )
  }

}
