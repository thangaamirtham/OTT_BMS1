import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable()
export class RoleService {
	role: any = [];
	constructor(
		private http: HttpClient,
	) { }

	getToken() {
		return (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
	}
	getRefreshtoken(){
		return (localStorage.getItem('ref_token') ? JSON.parse(localStorage.getItem('ref_token')): null);
	}
	
	getroleid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['role']) : 0);
	}
	
	getusername() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['profile_id'] : null);
	}
	getFname() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['fname'] : null);
	}
	getbusid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['bid']) : 0);
	}
	
	getmenurole(menu_role) {
		this.role = (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['menu_role']) : []);
		return this.role.find(x => x == menu_role) ? false : true;
	}


	getLname() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['lname'] : null);
	}
	getresellerid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['reseller_id']) : 0);
	}
	getispid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['isp_id']) : 0);
	}
	getmanagerid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['manager_id']) : 0);
	}
	getsubid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['sub_id']) : 0);
	}
	getgrupid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['group_id']) : 0);
	}
	getusertype() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['user_type']) : 0);
	}
}