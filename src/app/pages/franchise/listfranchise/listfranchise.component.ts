import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listfranchise',
  templateUrl: './listfranchise.component.html',
  styleUrls: ['./listfranchise.component.scss']
})
export class ListfranchiseComponent implements OnInit {
  router: any;count;download;data;datas;search;
  private route: Router
  constructor() { }

  ngOnInit() {
  }

  async add(){
    this.route.navigate(['/pages/franchise/addfranchise'])
  }
refresh(){

  this.ngOnInit()

}
}
