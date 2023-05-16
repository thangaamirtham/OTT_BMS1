import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  async listuser(params) {
    return await this.http.post("/subs/listSubscriber", params).toPromise();
  }

  async adduser(params) {
    return await this.http.post("/subs/addSubscriber", params).toPromise();
  }

  async edituser(params) {
    return await this.http.post("/subs/editSubscriber", params).toPromise();
  }

  async showUser(params) {
    return await this.http.post("/subs/showuser", params).toPromise();
  }
  async getUser(params) {
    return await this.http.post("/subs/getUser", params).toPromise();
  }

  async changeProfilePwd(params) {
    return await this.http.post("/subs/changeProfilePwd", params).toPromise();
  }

  async changeValidity(params) {
    return await this.http.post("/subs/changeValidity", params).toPromise();
  }




}