import { Component, OnInit } from '@angular/core';
import { packaddComponent } from '../packadd/packadd.component';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { PackService } from '../../_service';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// declare function bytesToSize(bytes):any;
@Component({
  selector: 'packList',
  templateUrl: './packListComponent.html',
  styleUrls: ['./packListComponent.scss'],

})

export class packListComponent implements OnInit {
  srvList; data; totalpage = 10; pages = [1, 2, 3, 4, 5]; count; ; groupname = ''
  bus; bus_id; group1; groupid; nas1; nas_name; nam1; name; rescount; nascount; subcount; search;
  bus_name = ''; group_name = ''; res1; res_name = ''; srvmode = ""; Service = ""; Data = "";
  pager: any = {}; page: number = 1; pagedItems: any = []; limit: number = 25;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;refresh;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  constructor(
    private route: Router,
    private pack: PackService,


  ) { }

  async ngOnInit() {
   await this.List();
  }
  async List(){
    let result=await this.pack.listpack({})
    this.data=result['data'];
    console.log(this.data)
  }
  async add(){
    console.log('dgfg')
    localStorage.clear();
    await this.route.navigate(['/pages/package/add-package'])
  }
  Edit(item) {
    localStorage.setItem('array', JSON.stringify(item));
    this.route.navigate(['/pages/package/add-package']);
  }
  // view_service(item) {
  //   localStorage.setItem('details', JSON.stringify(item))
  //   this.route.navigate(['/pages/user/viewuser'])
  // }
}