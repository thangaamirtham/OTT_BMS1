import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, AccountService } from '../../_service/index';
import { RenewuserComponent } from '../renewuser/renewuser.component';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ShowpasswordComponent } from '../showpassword/showpassword.component';
import { ChangeValidityComponent } from '../change-validity/change-validity.component';
import { async } from '@angular/core/testing';


@Component({
  selector: 'ngx-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit, OnDestroy {
  user_id; data; invoicedata; config;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  constructor(
    private route: Router,
    private modal: NgbModal,
    private user: UserService,
    private accser: AccountService,
  ) {
    this.user_id = JSON.parse(localStorage.getItem('userid'));
  }

  async ngOnInit() {
    console.log('userid ----', this.user_id)
    await this.view();
    await this.invoicelist();
  }

  async view() {
    this.loading = true
    let result = await this.user.listuser({ id: this.user_id });
    this.loading = false;
    this.data = result[0][0];
  }

  renewUser(uid, role_type, dmid, sdmid, mid) {
    console.log('Renew', uid)
    const activeModal = this.modal.open(RenewuserComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Renewal';
    activeModal.componentInstance.item = { uid, role_type, dmid, sdmid, mid };
    activeModal.result.then(async(data) => {
      await this.view();
     await this.invoicelist()
    })
  }

  changePwd(uid) {
    const activeModal = this.modal.open(ChangepasswordComponent, { size:'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Change Password';
    activeModal.componentInstance.item = uid;
    activeModal.result.then((data) => {
      this.view();
    })
  }

  show_propass() {
    const activeModal = this.modal.open(ShowpasswordComponent, { size: 'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Profile Password';
    activeModal.componentInstance.item = this.data['user_pwd']
    activeModal.result.then((data) => {
      this.view();
    })
  }

  changeValidity(uid,expdate){
    const activeModal = this.modal.open(ChangeValidityComponent, { size: 'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Change Validity';
    activeModal.componentInstance.item = {uid,expdate}
    activeModal.result.then((data) => {
      this.view();
    })
  }

  async invoicelist() {
    if (this.user_id) {
      let res = await this.accser.listInvoice({ uid: this.user_id })
      this.invoicedata = res[0];
    }
  }

  async refresh() {
    await this.view();
    await this.invoicelist();
  }

  cancel() {
    this.route.navigate(['/pages/user/list-user']);
    localStorage.removeItem('userid');
  }

  ngOnDestroy(): void {
    //  localStorage.removeItem('userid');
  }

}
