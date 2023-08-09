import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient,
  ) { }

  async getBalance(params) {
    return await this.http.post("/api/dashboard/getBalance", params).toPromise();
  }
  async getYexp(params) {
    return await this.http.post("/api/dashboard/getYexp", params).toPromise();
  }
  async getTodayexp(params) {
    return await this.http.post("/api/dashboard/getTodayexp", params).toPromise();
  }
  async getTomorrowExp(params) {
    return await this.http.post("/api/dashboard/getTomorrowExp", params).toPromise();
  }
  async getDFT(params) {
    return await this.http.post("/api/dashboard/getDFT", params).toPromise();
  }
  async getAggExp(params) {
    return await this.http.post("/api/dashboard/getAggExp", params).toPromise();
  }
  async getcount(params) {
    return await this.http.post("/api/dashboard/getcount", params).toPromise();
  }
  async search(params) {
    return await this.http.post("/api/dashboard/search", params).toPromise();
  }
  async chart(params) {
    return await this.http.post("/api/dashboard/chart", params).toPromise();
  }
  async payment(params) {
    return await this.http.post("/api/dashboard/payment", params).toPromise();
  }
  async getCAFPending(params){
    return await this.http.post("/api/dashboard/getCAFPending",params).toPromise();
  }
  async getDeposit(params){
    return await this.http.post("/api/dashboard/getDeposit",params).toPromise();
  }
}