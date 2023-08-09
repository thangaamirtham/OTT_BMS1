import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PackService {
  constructor(
    private http: HttpClient
  ) { }

  async listpack(params) {
    return await this.http.get("/pack/list", params).toPromise();
  }
  async listAllowPack(params){
    return await this.http.post("/api/pack/listAllowPack", params).toPromise();
  }
  async addpack(params) {
    return await this.http.post("/pack", params).toPromise();
  }

  async editpack(params) {
    const { pack_id } = params
    return await this.http.put("/pack/" + pack_id, params).toPromise();

  }
  async packMap(params) {
    return await this.http.post("/api/pack/packMap", params).toPromise();
  }
  async listPackMap(params) {
    return await this.http.post("/api/pack/listPackMap", params).toPromise();
  }
  async updatepackMap(params) {
    return await this.http.post("/api/pack/updatepackMap", params).toPromise();
  }
  async showOTT(params){
    return await this.http.post("/api/pack/showOTTPlatforms", params).toPromise();
  }
  async showOTTPlan(params){
    return await this.http.post("/api/pack/showOTTPlan", params).toPromise();
  }
  async showOTTPlanName(params){
    return await this.http.post("/api/pack/showOTTPlanName", params).toPromise();
  }
  async addOTTPlan(params){
    return await this.http.post("/api/pack/addOTTPlan", params).toPromise();
  }
  async listOTTPlan(params){
    return await this.http.post("/api/pack/listOTTPlan", params).toPromise();
  }
  async editOTTPlan(params){
    return await this.http.post("/api/pack/editOTTPlan", params).toPromise();
  }
  async getottplanname(params){
    return await this.http.post("/api/pack/getottplanname", params).toPromise();
  }
  

}