import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class generservices{
  constructor(
    private http: HttpClient
  ) { }

  async genre_list(params) {
    return await this.http.post("/api/genre/listGenre", params).toPromise();
  }

  async addgenre(params) {
    return await this.http.post("/api/genre/addGenre", params).toPromise();
  }

async editgenre(params)
{
  const {genre_id}=params
  // return await this.http.put("/api/genre/updateGenre" +genre_id,params).toPromise();
   return await this.http.put("/api/genre/updateGenre"  + "/" + genre_id,params).toPromise();


}

async genre_get(params) {
  return await this.http.post("/api/genre/getGenre", params).toPromise();
}

}