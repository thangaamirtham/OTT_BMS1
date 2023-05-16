import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat } from "rxjs-compat/operator/concat";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Injectable()
export class SelectService{
    constructor(
        private http:HttpClient
    ){
    }

    async showState(params = {}){
         return await this.http.post("/api/select/showState",params).toPromise();
    }
    async showDistrict(params){
        return await this.http.post("/api/select/showDistrict",params).toPromise();
    }
}