import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpClient
  ) { }

  async payment(params) {
    return await this.http.post("/pay/mePay", params, { responseType: 'text' }).toPromise();
  }

  async paysuccess(params) {
    return await this.http.post("/pay/meTrnSuccess", params).toPromise();
  }

  async paystatus(params) {
    return await this.http.post("/pay/meTrnStaus", params).toPromise();
  }

  async payStatusCheck(params) {
    return await this.http.post("/pay/meCheckStatus", params).toPromise();
  }

  async myPaymentAPI(params) {
    return await this.http.post("/pay/myPaymentAPI", params).toPromise();
  }


}