import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class businesservice{
    constructor(
        private http:HttpClient
    ){
    }

    async listbusiness(params){
        return await this.http.post("/api/business/listbusiness",params).toPromise();
    }
    async getbusinessedit(params){
        return await this.http.post("/api/business/getBusinessEdit",params).toPromise();
    }
    async addbusiness(params){
        return await this.http.post("/api/business/addBusiness",params).toPromise();
    }
    async uploadLogo(file){
        return await this.http.post("/api/business/uploadLogo",file).toPromise();
    }

    async updatelogo(params){
        return await this.http.get("/api/business/getIspLogo",{params}).toPromise();
    }

    async editBusiness(params){
        return await this.http.post("/api/business/editBusiness",params).toPromise();
    }


    async showdistributor(params){
        return await this.http.post("/api/business/showDistributor",params).toPromise();
    }
   
   
 
}