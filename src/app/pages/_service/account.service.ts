import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  async listInvoice(params){
    return await this.http.post('/account/listInvoice',params).toPromise();
  }
  async addDeposit(params){
    return await this.http.post('/account/addDeposit',params).toPromise();
  }
  async listDeposit(params){
    return await this.http.post('/account/listDeposit',params).toPromise();
  }
  async showGateway(params){
    return await this.http.post('/account/showGateway',params).toPromise();
  }

  
}
