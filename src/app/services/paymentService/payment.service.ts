import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/cardModel';
import { Payment } from 'src/app/models/payment';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl: 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) {}
  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'payments/add';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

  cardSave(cardModel: CardModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'carddetails/addcard';
    return this.httpClient.post<ResponseModel>(newPath, cardModel);
  }

  checkPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = "https://localhost:44357/api/payments/checkpayment"
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }


}
