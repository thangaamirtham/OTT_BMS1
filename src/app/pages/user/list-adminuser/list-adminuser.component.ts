import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { UserService, PagerService,RoleService } from '../../_service/index';
import { RenewuserComponent } from '../renewuser/renewuser.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { DatePipe } from '@angular/common';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';


@Component({
  selector: 'list-adminuser',
  templateUrl: './list-adminuser.component.html',
  styleUrls: ['./list-adminuser.component.scss']
})
export class ListAdminuserComponent implements OnInit,OnDestroy {
  data: any = []; count; datas; search;
  userData; user_data; userMobile; user_mobile;act_status;
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25; dashstatus;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';create_status

  constructor(
    private router: Router,
    private user: UserService,
    private modal: NgbModal,
    public pageservice: PagerService,
    private datePipe: DatePipe,
    public role: RoleService

  ) { this.dashstatus = JSON.parse(localStorage.getItem('dash_status')) }

  async ngOnInit() {
     await this.list();
    await this.showUser();
    await this.showMobile();
  }
  async list() {
    this.loading =true;
    let result = await this.user.listuser({
      id: this.user_data, mobile: this.user_mobile, index: (this.page - 1) * this.limit
      , limit: this.limit,create_from:this.create_status,
      active: this.dashstatus == 2 ? 1:this.dashstatus == 3? 2:this.act_status  // active-1 2-expired
    })
    this.loading = false;
    console.log(result)
    this.data = result[0];
    this.count = result[1].count;
    console.log(this.data)
    this.setPage();
  }

  async refresh() {
    this.user_data = ''; this.user_mobile = '';this.create_status='';this.act_status='';
    await this.list();
  }
  async download() {
    this.loading = true;
    let res = await this.user.listuser({
      id: this.user_data, mobile: this.user_mobile,create_from:this.create_status,
      active: this.dashstatus == 2 ? 1:this.dashstatus == 3? 2:this.act_status  // active-1 2-expired
    })
    this.loading = false;
    if (res) {
      let tempdata = [], temp: any = res[0];
      for (var i = 0; i < temp.length; i++) {
        let param = {};

        if(this.role.getroleid()>777){
          param['ID'] = temp[i]['id'];
          param['RESELLER TYPE'] = temp[i]['role_type']==1?'Distributor':temp[i]['role_type'] == 2? 'Sub-Distributor':temp[i]['role_type']==3?'Reseller':'';
          param['RESELLER NAME'] = temp[i]['bname'];
        }
        param['PROFILEID'] = temp[i]['profileid'];
        param['USER NAME'] = temp[i]['fullname'];
        param['EMAIL'] = temp[i]['email'];
        param['MOBILE'] = temp[i]['mobile'];
        param['GLTVEXPIRY'] = this.datePipe.transform(temp[i]['expirydate'],'d MMM y hh:mm:ss a');
        param['OTTEXPIRY'] =  this.datePipe.transform(temp[i]['ottexpirydate'],'d MMM y hh:mm:ss a');
        param['CREATEFROM'] = temp[i]['create_From'] == 1 ? 'GLTV' : 'BMS';
        param['STATUS'] = temp[i]['ustatus'] == 1? 'Enable' : 'Disable';

         // temp[i]['inv_date'] = this.datePipe.transform(temp[i]['inv_date'], 'd MMM y hh:mm:ss a')
        
        tempdata[i] = param
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'List Users' + EXCEL_EXTENSION);
    }
  }
  async add() {
    this.router.navigate(['/pages/user/add-user'])
  }

  async showUser($event = '') {
    this.userData = await this.user.showUser({ like: $event })
  }

  async showMobile($event = '') {
    this.userMobile = await this.user.showUser({ uid: this.user_data, mobile_like: $event })
  }

  viewUser(userid) {
    console.log('ViewUser', userid)
    localStorage.setItem('userid', JSON.stringify(userid));
    this.router.navigate(['/pages/user/view-user']);
  }
  renew_user(uid) {
    console.log('Renew', uid)
    const activeModal = this.modal.open(RenewuserComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Renewal';
    activeModal.componentInstance.item = uid;
    activeModal.result.then((data) => {
      // this.list();
    })
  }
  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.list();
    }
  }

  changePwd(uid) {
    const activeModal = this.modal.open(ChangepasswordComponent, { size:'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Change Password';
    activeModal.componentInstance.item = uid;
    activeModal.result.then((data) => {
     })
  }


  setPage() {
    // console.log(this.data);
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dash_status');
   }



}