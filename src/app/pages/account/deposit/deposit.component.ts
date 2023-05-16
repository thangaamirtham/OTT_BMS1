import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, businesservice } from '../../_service/index';
import { DomSanitizer } from '@angular/platform-browser';
import { SuccessComponent } from './../success/success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  submit: boolean = false; AddDepositForm; reseldata; pro; balamt;
  
  constructor(
    private alert: ToasterService,
    private router: Router,
    private ser: AccountService,
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private resser: businesservice
    // private acct: acctService,

  ) { }

  async resellername($event = '') {
    this.reseldata = await this.resser.showdistributor({ type: this.AddDepositForm.value['Role'], like: $event })
    // console.log("reseller",this.reseldata)
  }

  async resbalance() {
    let reslid = this.AddDepositForm.value['res_name'];
    let balance = await this.reseldata.filter(item => item.mid == reslid).map(item => item.mamt);
    this.balamt = balance;
    if (this.balamt) {
      // console.log("amount",this.balamt);
      this.AddDepositForm.controls.res_balance.setValue(this.balamt)
    }
  }

  async ngOnInit() {
    this.createForm();
     await this.resellername();
  }

  async addDeposit() {
    console.log(this.AddDepositForm.value)
    if (this.AddDepositForm.invalid) {
      this.submit = true;
      return;
    }
    // console.log("inside",this.AddDepositForm.value)
    let result = await this.ser.addDeposit(this.AddDepositForm.value)
    console.log('Result',result);
    
    if (result[0]['error_msg'] == 0) {
      this.result_pop(result);

    } else {
      this.result_pop(result);
    }

  }

  toastalert(msg, status = 0) {
    const toast: Toast = {
      type: status == 1 ? 'success' : 'warning',
      title: status == 1 ? 'Success' : 'Failure',
      body: msg,
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
  }

  result_pop(item) {
    const activeModal = this.activeModal.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Result';
    activeModal.componentInstance.item = item;
    activeModal.result.then((data) => {

    });
  }

  createForm() {
    this.AddDepositForm = new FormGroup({
      Role: new FormControl('', Validators.required),
      res_balance: new FormControl(''),
      res_name: new FormControl('', Validators.required),
      dep_mode: new FormControl('', Validators.required),
      dep_amount: new FormControl(''),
      reason: new FormControl('', Validators.required),
      note: new FormControl(''),
    });
  }
}