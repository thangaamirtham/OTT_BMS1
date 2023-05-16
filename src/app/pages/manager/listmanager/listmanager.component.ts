import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { businesservice, PagerService } from '../../_service/index';
import { LogoupdateComponent } from '../logoupdate/logoupdate.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'ngx-listmanager',
  templateUrl: './listmanager.component.html',
  styleUrls: ['./listmanager.component.scss']
})
export class ListmanagerComponent implements OnInit {
  data; count; search;
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;
  role_type = ''; share_type = ''; status = ''; company; profile_id; bname; profile;
  constructor(
    private router: Router,
    private business: businesservice,
    private model: NgbModal,
    public pageservice: PagerService,

  ) { }

  async ngOnInit() {
    await this.list();
  }

  async showUser($event = '') {
    this.bname = await this.business.showdistributor({ role: this.role_type, like: $event })
  }
  async showUserName($event = '') {
    this.profile = await this.business.showdistributor({ role: this.role_type, like: $event })
  }
  view_logo(id) {
    const activeModal = this.model.open(LogoupdateComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'ISP LOGO';
    activeModal.componentInstance.item = { id: id }
    activeModal.result.then((data) => {
      this.list();
    })
  }


  async list() {
    this.loading = true;
    let result = await this.business.listbusiness({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      role: this.role_type,
      bname: this.company,
      profile_id: this.profile_id,
      status: this.status,
      share_type: this.share_type
    })
    if (result) {
      this.loading = false;
      this.data = result[0];
      this.count = result[1]['tot']
      console.log(result)
      this.setPage();
    } else this.loading = false


  }

  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.list();
    }
  }

  setPage() {
    // console.log(this.data);
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }

  async refresh() {
    this.role_type = ''; this.company = ''; this.profile_id = ''; this.share_type = ''; this.status = '';
    await this.list();
  }

  async download() {
    this.loading = true;
    let res = await this.business.listbusiness({
      role: this.role_type,
      bname: this.company,
      profile_id: this.profile_id,
      status: this.status,
      share_type: this.share_type
    })
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        param['ID'] = temp[i]['mid'];
        param['ROLE'] = temp[i]['role'] == 777 ? 'Distributor': temp[i]['role'] ==666? 'Sub-Distributor': temp[i]['role'] ==555 ? 'Reseller': '--';
        param['COMPANY'] = temp[i]['bname'];
        param['USERNAME'] = temp[i]['userid'];
        param['NAME'] = temp[i]['fname'];
        param['EMAIL'] = temp[i]['email'];
        param['MOBILE'] = temp[i]['mobile'];
        param['SHARE TYPE'] = temp[i]['sharetype'] == 1 ? 'Bulk': 'Deposit';
        param['GLTV SHARE'] = temp[i]['bshare'] ? temp[i]['bshare'] + '%' : 0;
        param['DIST SHARE'] = temp[i]['dshare'] ? temp[i]['dshare'] + '%' : 0;
        param['SUBDIST SHARE'] = temp[i]['sdshare'] ? temp[i]['sdshare'] + '%' : 0;
        param['RESELLER SHARE'] = temp[i]['mshare'] ? temp[i]['mshare'] + '%' : 0;
        param['STATUS'] = temp[i]['status'] == 1 ? 'Active' : 'Inactive';

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Reseller List' + EXCEL_EXTENSION);
    }
  }
}
