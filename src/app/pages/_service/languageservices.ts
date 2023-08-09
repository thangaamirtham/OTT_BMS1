import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class languageservices{
  constructor(
    private http: HttpClient
  ) { }

  async language_list(params) {
    return await this.http.post("/api/lang/getLanguage", params).toPromise();
  }

  async language_add(params) {
    return await this.http.post("/channellang", params).toPromise();
  }

  async language_edit(params) {
    const {lang_id} = params;
    return await this.http.put("/channellang/"+lang_id,params).toPromise();
  }

}