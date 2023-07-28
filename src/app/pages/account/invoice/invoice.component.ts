import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AccountService, RoleService, UserService, OperationService, PagerService } from '../../_service/index';
import { SuccessComponent } from './../success/success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { DatePipe } from '@angular/common';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Component({
  selector: 'ngx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  data; count; userData; user_data; userMobile; user_mobile; search;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes; status = '';
  public loading = false;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;
  start_date = ''; end_date = ''; ott_vendor = ''

  constructor(
    private accService: AccountService,
    public role: RoleService,
    private user: UserService,
    private opService: OperationService,
    public pageservice: PagerService,
    public activeModal: NgbModal,
    private datePipe: DatePipe

  ) { }

  async ngOnInit() {
    await this.initialList();
    await this.showUser();
    await this.showMobile();
  }

  async initialList() {
    this.loading = true;
    let result = await this.accService.listInvoice({
      uid: this.user_data, mobile: this.user_mobile, index: (this.page - 1) * this.limit
      , limit: this.limit, status: this.status, start_date: this.start_date, end_date: this.end_date, ott_vendor: this.ott_vendor
    })
    if (result) {
      this.loading = false;
      console.log('Invoice result', result);
      this.data = result[0];
      //  for(let item of this.data){
      //   if(!(!item.res_msg)){
      //   console.log('item',item.res_msg,'type',typeof(item.res_msg));

      //   console.log(eval(item.res_msg));          

      //   } 

      // }
      this.count = result[1]['count'];
      this.setPage();

    } else {
      this.loading = false
    }
  }

  async refresh() {
    this.user_data = ''; this.user_mobile = ''; this.status = ''; this.start_date = ''; this.end_date = ''; this.ott_vendor = '';
    await this.initialList();
    await this.showUser();
    await this.showMobile();
  }

  async download() {
    this.loading = true;
    let res = await this.accService.listInvoice({
      uid: this.user_data, mobile: this.user_mobile, status: this.status, start_date: this.start_date, end_date: this.end_date,
      ott_vendor: this.ott_vendor
    })
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};
        if (this.role.getroleid() > 777) {
          param['ID'] = temp[i]['iolid'];
          param['RESELLER TYPE'] = temp[i]['role_type'] == 1 ? 'Distributor' : temp[i]['role_type'] == 2 ? 'Sub-Distributor' : temp[i]['role_type'] == 3 ? 'Reseller' : '';
          param['RESELLER NAME'] = temp[i]['manager'];
        }

        param['PROFILEID'] = temp[i]['profileid'];
        param['USER NAME'] = temp[i]['fullname'];
        param['MOBILE'] = temp[i]['mobile'];
        param['GLTVPACK'] = temp[i]['gltvpackname'];
        param['OTTPACK'] = temp[i]['ottpackname'];
        param['INVOICE AMOUNT'] = temp[i]['totinvamt'];
        param['TAX AMOUNT'] = temp[i]['totinvtaxamt'];
        param['TOTAL AMOUNT'] = temp[i]['total'];
        param['RESELLER BEFORE AMOUNT'] = temp[i]['beforedetection'];
        param['DEDUCTED  AMOUNT'] = temp[i]['detectedamt'];
        param['GLTVEXPIRY'] = this.datePipe.transform(temp[i]['expirydate'], 'd MMM y hh:mm:ss a');
        param['OTTEXPIRY'] = this.datePipe.transform(temp[i]['ottexpirydate'], 'd MMM y hh:mm:ss a');
        param['RESPONSE'] = temp[i]['res_msg'];
        param['STATUS'] = temp[i]['ottstatus'] == 1 ? 'Processing' : temp[i]['ottstatus'] == 2 ? 'Activated' : 'Cancelled';
        param['VENDOR'] = temp[i]['ott_vendor'] == 1 ? 'M2MIT' : 'PLAYBOX'
        temp[i]['cdate'] = this.datePipe.transform(temp[i]['cdate'], 'd MMM y hh:mm:ss a')
        param['INVOICE DATE'] = temp[i]['cdate'];
        param['PAY STATUS'] = temp[i]['pay_status'] == 1 ? 'Un-paid' : 'Paid'

        // temp[i]['inv_date'] = this.datePipe.transform(temp[i]['inv_date'], 'd MMM y hh:mm:ss a')

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Invoice List' + EXCEL_EXTENSION);
    }
  }


  async showUser($event = '') {
    this.userData = await this.user.showUser({ like: $event })
  }

  async showMobile($event = '') {
    this.userMobile = await this.user.showUser({ uid: this.user_data, mobile_like: $event })
  }

  async checkOttStatus(item) {
    this.loading = true;
    console.log('item', item)
    let result = await this.opService.recheckOttStatus({ iolid: item })
    // this.loading = false
    console.log('result for recheck---', result);
    if (result) {
      this.loading = false;
      this.initialList
    } else this.loading = false;

  }

  result_pop(item) {
    const activeModal = this.activeModal.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Result';
    activeModal.componentInstance.item = item;
    activeModal.result.then((data) => {

    });
  }


  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initialList();
    }
  }

  setPage() {
    // console.log(this.data);
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }


}
