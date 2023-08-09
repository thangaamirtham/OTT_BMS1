import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class channelservices{
  constructor(
    private http: HttpClient
  ) { }

  async listchannels(params) {
    console.log('list')
    return await this.http.post("/api/channel/listChannel", params).toPromise();
  }

  async Addchannels(params) {
    console.log('addd...')
    return await this.http.post("/api/channel/addChannel", params).toPromise();

  }

  async editchannels(params)
{
  console.log('edittttt...')
  const {id}=params.id
  return await this.http.put("/api/channel/editChannel/" +id ,params).toPromise();

}

}