import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AccountService, RoleService, UserService, PagerService, PaymentService, businesservice } from '../../_service/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayStatusCheckComponent } from '../pay-status-check/pay-status-check.component';
import * as JSXLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {
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
    private pay: PaymentService,
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
      , limit: this.limit, online_pay: 1,
      role: this.role_type, manid: this.company, start_date: this.start_date, end_date: this.end_date, amt: this.dep_amt
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
    await this.initialList();
  }

  async download() {
    this.loading = true;
    let res = await this.accService.listDeposit({
      index: (this.page - 1) * this.limit
      , limit: this.limit, online_pay: 1,
      role: this.role_type, manid: this.company, start_date: this.start_date, end_date: this.end_date, amt: this.dep_amt
    });
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        param['ID'] = temp[i]['id'];
        param['RESELLER TYPE'] = temp[i]['role'] == 777 ? 'Distributor' : temp[i]['role'] == 666 ? 'Sub-Distributor' : 'Reseller';
        param['RESELLER NAME'] = temp[i]['bname'];
        param['ORDERID'] = temp[i]['txnid'];
        param['BEFORE BALANCE'] = temp[i]['manager_before_balance'];
        param['DEPOSIT AMOUNT'] = temp[i]['deposit_amount'];
        param['STATUS'] = temp[i]['gwstatus'] == 0 ? 'Initiate' : temp[i]['gwstatus'] == 1 ? 'Processing' : temp[i]['gwstatus'] == 2 ? 'Success' :
          temp[i]['gwstatus'] == 3 ? 'Failure' : '--'
        param['PAY TYPE'] = temp[i]['paymode'] || 'CASH';
        param['REMARKS'] = temp[i]['reason'];
        param['DEPOSIT BY'] = temp[i]['deposited_by'];
        param['DEPOSIT DATE'] = this.datepipe.transform(temp[i]['cdate'], 'd MMM y h:mm:ss a');
        param['MODIFY DATE'] = this.datepipe.transform(temp[i]['mdate'], 'd MMM y h:mm:ss a');

        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Online Payment List' + EXCEL_EXTENSION);
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

  async statuscheck(dep_id) {
    this.loading = true;
    let result = await this.pay.payStatusCheck({ id: dep_id });
    console.log('Result', result);
    if (result) {
      this.loading = false
      const activemodal = this.activeModal.open(PayStatusCheckComponent, { size: 'lg', container: 'nb-layout' })
      activemodal.componentInstance.modalHeader = 'Payment Status';
      activemodal.componentInstance.item = result[0];
      activemodal.result.then((data) => {
        this.initialList();
      });
    } else {
      this.loading = false;
    }

  }
}

