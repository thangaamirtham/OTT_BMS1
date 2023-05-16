import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AccountService, RoleService, UserService, PagerService, businesservice } from '../../_service/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-listdeposit',
  templateUrl: './listdeposit.component.html',
  styleUrls: ['./listdeposit.component.scss']
})
export class ListdepositComponent implements OnInit {
  data; count; userData; user_data; userMobile; user_mobile; search;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes; config;
  public loading = false;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25; totamount;
  role_type = ''; company; start_date; end_date; dep_amt;
  bname;

  constructor(
    private accService: AccountService,
    public role: RoleService,
    private user: UserService,
    public pageservice: PagerService,
    public activeModal: NgbModal,
    private business: businesservice,
    private datepipe: DatePipe
  ) { }


  async showUser($event = '') {
    this.bname = await this.business.showdistributor({ role: this.role_type, like: $event })
  }

  async ngOnInit() {
    await this.initialList();
  }

  async initialList() {
    this.loading = true;
    let result = await this.accService.listDeposit({
      index: (this.page - 1) * this.limit
      , limit: this.limit, role: this.role_type, manid: this.company, start_date: this.start_date, end_date: this.end_date, amt: this.dep_amt
    });
    console.log('result', result);

    if (result) {
      this.loading = false;
      this.data = result[0];
      this.count = result[1]['count'];
      this.totamount = result[1]['dep_amt'];
      this.setPage();

    } else {
      this.loading = false
    }
  }

  async refresh() {
    this.role_type = ''; this.company = ''; this.start_date = ''; this.end_date = ''; this.dep_amt = '';
    await this.initialList();
  }

  async download() {
    this.loading = true;
    let res = await this.accService.listDeposit({
      index: (this.page - 1) * this.limit
      , limit: this.limit, role: this.role_type, manid: this.company, start_date: this.start_date, end_date: this.end_date, amt: this.dep_amt
    });
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        param['ID'] = temp[i]['id'];
        param['RESELLER TYPE'] = temp[i]['role'] == 777 ? 'Distributor' : temp[i]['role'] == 666 ? 'Sub-Distributor' : 'Reseller';
        param['RESELLER NAME'] = temp[i]['bname'];
        param['DEPOSIT TYPE'] = temp[i]['deposit_type'] == 1 ? 'Deposit' : temp[i]['deposit_type'] == 2 ? 'Debit' : temp[i]['deposit_type'] == 3 ? 'Reseller Online Topup' : '--';
        param['ORDERID'] = temp[i]['txnid'];
        param['DEPOSIT AMOUNT'] = temp[i]['deposit_amount'];
        param['REASON'] = temp[i]['reason'];
        param['DEPOSIT BY'] = temp[i]['deposited_by'];
        param['DEPOSIT DATE'] = this.datepipe.transform(temp[i]['cdate'], 'd MMM y h:mm:ss a');
        param['STATUS'] = temp[i]['status'] == 0 ? 'Active' : 'Cancelled';

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Deposit List' + EXCEL_EXTENSION);
    }
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

