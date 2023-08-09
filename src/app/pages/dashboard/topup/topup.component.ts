import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../_service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { timeout } from 'rxjs/operators';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';


@Component({
  selector: 'topup',
  templateUrl: './topup.component.html',
})

export class TopupComponent implements OnInit {
  submit: boolean = false; TopupForm; datas; id; modalHeader; config;
  item; data;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private payser: PaymentService,
    private router: Router
  ) { }

  closeModal() {
    this.activeModal.close();
    // this.router.navigate(['/pages/cust/viewcust'])
  }

  async ngOnInit() {
    await this.createForm();

  }

  async addPay() {
    this.loading = true;
    if (this.item['res_flag'] == 1) {
      this.TopupForm.value['pay_type'] = 1;
    }
    if (this.item['subs_flag'] == 2) {
      this.TopupForm.value['pay_type'] = 3;
    }

    let res = await this.payser.myPaymentAPI(this.TopupForm.value);
    console.log(res);
    // let res = JSON.parse(res)
    this.loading = false;
    console.log('Response', res);
    if (res['error_msg'] == 0) {
      console.log('Response');
      const div = document.createElement('div');
      div.innerHTML = res['msg'];
      while (div.children.length > 0) {
        document.body.appendChild(div.children[0])
      }
      const form: any = document.getElementById("f1");
      form.submit();
    
    } else {
    
      console.log('Error Msg.', res);
      const toast: Toast = {
        type: res['error_msg'] == 0 ? 'success' : 'warning',
        title: res['error_msg'] == 0 ? 'Success' : 'Failure',
        body: res['StatusDesc'],
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      window.alert(toast.body);
      // this.alert.popAsync(toast);
    }



  }

  async paysucess() {
    let sucres = await this.payser.paysuccess({});
    // console.log(sucres);

  }



  createForm() {
    this.TopupForm = new FormGroup({
      amt: new FormControl('', Validators.required),
      // pay_mode : new FormControl('1',Validators.required),
      trnRemarks: new FormControl('',Validators.required),
    });
  }
}