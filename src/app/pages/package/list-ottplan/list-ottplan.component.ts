import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { RoleService, PagerService, PackService } from '../../_service/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { OTTPlanComponent } from '../ott-plan/ott-plan.component';
import { OttcountComponent } from '../ottcount/ottcount.component';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'list-ottplan',
  templateUrl: './list-ottplan.component.html',
  styleUrls: ['./list-ottplan.component.scss']

})

export class ListOTTPlanComponent implements OnInit {
  submit: boolean = false; ottdata; total; bus; bus_name; config; search; group1; group_name;
  pager: any = {}; page: number = 1; pagedItems: any = []; limit: number = 25; ottplan_code; ottplandata; ottplan_name; ottplanname;
  status = ''; taxtype = '';days ='';ott_vendor='';
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  constructor(
    public role: RoleService,
    public pageservice: PagerService,
    private nasmodel: NgbModal,
    private pack: PackService,

  ) { }

  async ngOnInit() {
    localStorage.removeItem('Array');
    await this.initiallist();
    await this.showOTTPlanCode();
    await this.showOTTPlanName();
  }


  async showOTTPlanCode($event = '') {
    this.ottplandata = await this.pack.showOTTPlanName({ like: $event });
  }

  async showOTTPlanName($event = '') {
    this.ottplanname = await this.pack.showOTTPlanName({ c_like: $event });
  }

  async refresh() {
    this.bus_name = '';
    this.group_name = '';
    this.ottplan_code = '';
    this.ottplan_name = '';
    this.status = '';
    this.taxtype = '';
    this.days='';
    this.ott_vendor='';
    await this.initiallist();

  }

  async initiallist() {
    this.loading = true;
    let result = await this.pack.listOTTPlan(
      {
        index: (this.page - 1) * this.limit,
        limit: this.limit,
        ottplan_code: this.ottplan_code,
        ottplan_name: this.ottplan_name,
        status: this.status,
        taxtype: this.taxtype,
        days:this.days,
        ott_vendor:this.ott_vendor
      })
    if (result) {
      this.loading = false;
      this.ottdata = result[0];
      this.total = result[1]["count"];
      this.setPage();
    }
  }

  getlist(page) {
    var total = Math.ceil(this.total / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initiallist();
    }
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.total, this.page, this.limit);
    this.pagedItems = this.ottdata;
  }

  Add_OTT() {
    const activeModal = this.nasmodel.open(OTTPlanComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add OTT Plan';
    activeModal.result.then((data) => {
      this.initiallist();
    });
  }

  async ottcount(item) {
    let result = await this.pack.showOTTPlan({ ottid: item });
    console.log('Count Result', result)
    await this.ottcountshow(result)
  }

  ottcountshow(data) {
    const activeModal = this.nasmodel.open(OttcountComponent, { size: 'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'OTT PLATFORM';
    activeModal.componentInstance.item = data;
    activeModal.result.then((data) => {
      // this.initiallist();
    });
  }

  async download() {
    this.loading = true;
    let res = await this.pack.listOTTPlan({
      ottplan_code: this.ottplan_code,
      ottplan_name: this.ottplan_name,
      status: this.status,
      taxtype: this.taxtype,
      days:this.days,
      ott_vendor:this.ott_vendor
    })
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      console.log('data',temp);
      
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        param['ID'] = temp[i]['ottplanid'];
        param['PLAN NAME'] = temp[i]['ottplan_name'];
        param['PLAN CODE'] = temp[i]['ottplancode'];
        param['TIME UNIT'] = temp[i]['dayormonth'] == 2 ? temp[i]['days'] + " " + "Month" : temp[i]['days'] + " " + "Days";
        param['AMOUNT'] = temp[i]['ottamount'];
        param['OTT PROVIDER'] = temp[i]['platforms'];
        param['TAX TYPE'] = temp[i]['taxtype'] == 1 ? 'Exclusive' : 'Inclusive';
        param['VENDOR'] =temp[i]['ott_vendor'] == 1 ? 'M2MIT': temp[i]['ott_vendor'] == 2 ? 'PlayBox': '--'
        param['STATUS'] = temp[i]['status'] == 1 ? 'Enable' : 'Disable';

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'OTT PLAN' + EXCEL_EXTENSION);
    }
  }

}
