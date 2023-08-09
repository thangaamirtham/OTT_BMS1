import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService, RoleService } from '../../_service/index';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'ngx-pay-status-check',
  templateUrl: './pay-status-check.component.html',
  styleUrls: ['./pay-status-check.component.scss']
})
export class PayStatusCheckComponent implements OnInit {

  submit: boolean = false; item; modalHeader; paydata; CompHistroyForm;
  orderid; status_descp; resp_code; trascn_num; msg;amount;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  constructor(
    private alert: ToasterService,
    private payser: PaymentService,
    private router: Router,
    public activeModal: NgbActiveModal,
    public role: RoleService
  ) { }

  closeModal() {
    this.activeModal.close(true);

  }

  async ngOnInit() {
    console.log('Pay Status Check---', this.item);
    if (this.item.error_msg == 0) {
      console.log('Item', this.item['error_msg'])
      this.status_descp = this.item.msg;
      this.orderid = this.item.txnid;
      this.resp_code = this.item.status;
      this.amount = this.item.amount;
    } else {
      this.msg = this.item.msg;
    }
  }


}