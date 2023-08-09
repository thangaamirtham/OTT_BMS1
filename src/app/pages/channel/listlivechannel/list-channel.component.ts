import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
// import { CompliantHistoryComponent } from './../comphistory/comp-history.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSXLSX from 'xlsx';
import {channelservices } from '../../_service/channel';



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'list-channel',
  templateUrl: './list-channel.component.html',
  styleUrls:['./list-channel.component.scss']
})
export class ListCompComponent implements OnInit {
  datas;search;reseller_name;cust;count;config;tot;compdata;custname;busname;profile;resell;
  bus_name='';resel_type='';res_name='';cust_name='';data;download;

  pager: any = {}; page: number = 1; pagedItems: any = []; limit: number = 25;
  constructor(
    private route : Router,
    private alert: ToasterService,
    public nasmodel: NgbModal,
    private channel : channelservices

  ) {}

  
  async ngOnInit(){
    // localStorage.removeItem('array');
    await this.list();
}
async list(){
  let result=await this.channel.listchannels({})
   this.data = result[0]; this.count = result[1].count
  console.log(result)
}

async add(){
  console.log('dgfg')
  localStorage.clear();
  await this.route.navigate(['/pages/channel/add-channel'])
}
Edit(item) {
  localStorage.setItem('array', JSON.stringify(item));
  this.route.navigate(['/pages/channel/add-channel']);
}

refresh()
{

  this.list();
}

}