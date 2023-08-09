import { Component, OnInit } from '@angular/core';
import { PackService, RoleService, PagerService, businesservice } from '../../_service/index';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'ngx-allowpack',
  templateUrl: './allowpack.component.html',
  styleUrls: ['./allowpack.component.scss']
})
export class AllowpackComponent implements OnInit {
  data: any; count; search;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;
  taxtype = ''; status = ''; manid; ott_plan; user; plan; plan_code; code;
  ott_vendor='';
  constructor(
    private pack: PackService,
    public role: RoleService,
    public pagerservice: PagerService,
    private bus: businesservice
  ) { }

  async ngOnInit() {
    await this.list();
    await this.showUser();
    await this.showPlan();
    await this.showPlanCode();
  }

  async showUser($event = '') {
    this.user = await this.bus.showdistributor({ type: 4, like: $event })  // show: 777 666 555
  }

  async showPlan($event = '') {
    this.plan = await this.pack.showOTTPlanName({ like: $event })
  }

  async showPlanCode($event = '') {
    this.code = await this.pack.showOTTPlanName({ c_like: $event })
  }

  async list() {
    this.loading = true;
    let result = await this.pack.listAllowPack({
      index: (this.page - 1) * this.limit, limit: this.limit,
      manid: this.manid, ott_plan: this.ott_plan, status: this.status, taxtype: this.taxtype,
      ott_vendor:this.ott_vendor
    });
    if (result) {
      this.loading = false;
      console.log(result);
      this.data = result[0];
      this.count = result[1].count;
      this.setPage();
    } else this.loading = false;

  }

  async refresh() {
    this.manid = ''; this.ott_plan = ''; this.status = ''; this.taxtype = '';this.ott_vendor='';
    await this.ngOnInit()
  }

  setPage() {
    this.pager = this.pagerservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }

  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pagerservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.list();
    }

  }

  async download() {
    this.loading = true;
    let res = await this.pack.listAllowPack({ manid: this.manid, ott_plan: this.ott_plan, status: this.status, taxtype: this.taxtype,ott_vendor:this.ott_vendor })
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        param['ID'] = temp[i]['id'];
        param['RESELLER'] = temp[i]['bname'];
        param['PACK TYPE'] = temp[i]['otttype'] == 1 ? 'GLTV ONLY' : 'GLTV & OTT';
        param['VENDOR'] = temp[i]['ott_vendor'] == 1 ? 'M2MIT': 'PLAYBOX';
        param['GLTV PACK NAME'] = temp[i]['packname'];
        param['GLTV TIME UNIT'] = temp[i]['gltvdaytype'] == 2 ? temp[i]['gltvdays'] + " " + "Month" : temp[i]['gltvdays'] + " " + "Days";
        param['OTT PACK NAME'] = temp[i]['ottplan_name'];
        param['OTT TIME UNIT'] = temp[i]['dayormonth'] == 2 ? temp[i]['days'] + " " + "Month" : temp[i]['days'] + " " + "Days";
        param['GLTV PRICE'] = temp[i]['gltvpackamt'];
        param['OTT PRICE'] = temp[i]['ottpamt'];
        param['TOTAL'] = temp[i]['gltvpackamt'] + temp[i]['ottpamt'];
        param['TAX TYPE'] = temp[i]['taxtype'] == 1 ? 'Exclusive' : 'Inclusive';
        param['STATUS'] = temp[i]['apstatus'] == 1 ? 'Enable' : 'Disable';

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Reseller Package List' + EXCEL_EXTENSION);
    }
  }


}
