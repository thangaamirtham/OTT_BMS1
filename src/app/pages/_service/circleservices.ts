import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class circleservices{
  constructor(
    private http: HttpClient
  ) { }

  async circle_list(params) {
    return await this.http.get("/circle/list", params).toPromise();
  }

  async addcircle(params) {
    return await this.http.post("/circle", params).toPromise();
  }

  async editcircle(params)
{
  const {cid}=params
  return await this.http.put("/circle/" +cid,params).toPromise();

}



}