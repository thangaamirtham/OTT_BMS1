import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService, PackService, OperationService } from '../../_service/index';
import { AddSuccessComponent } from '../success/add-success.component';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';


@Component({
  selector: 'ngx-renewuser',
  templateUrl: './renewuser.component.html',
  styleUrls: ['./renewuser.component.scss']
})
export class RenewuserComponent implements OnInit {
  submit: boolean = false; RenewSubsForm; modalHeader; item; pack; ottPlatforms;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;
  ottPlanDetails;ottAmount;ottTaxAmount;ottTotal;
  constructor(
    private alert: ToasterService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private role: RoleService,
    private psrv: PackService,
    private oper: OperationService,
    private _formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    console.log('Renewal', this.item);
    await this.createForm();
    await this.packsrv();

  }

  closeModal() {
    this.activeModal.close(true);
  }

  async packsrv($event = '') {
    console.log('Event------',$event);
    let manid = this.item['role_type'] == 1 ? this.item['dmid'] : this.item['role_type'] == 2 ? this.item['sdmid'] : this.item['role_type'] == 3 ? this.item['mid'] : '';
    let resp = await this.psrv.listAllowPack({ like: $event, manid: manid,ott_vendor:2 });
    this.pack = resp[0]
    console.log('Pack', this.pack)
  }

  async getOttName() {
    const [{ottpid,oamt,otaxamt,ottpamt,otttype}] = this.pack.filter(x => x.id == this.RenewSubsForm.value['planid'])
    console.log('Packid', ottpid,oamt,otaxamt)
    this.ottAmount=oamt;this.ottTaxAmount=otaxamt;this.ottTotal=Number(oamt) + Number(otaxamt)
    if(otttype==2){
      let result = await this.psrv.getottplanname({ ottplanid: ottpid });
      console.log('Ott name result', result)
      if (result['ottname']) this.ottPlatforms = result['ottname'].split(',')
      this.ottPlanDetails = result;
    }else  this.ottPlanDetails = '';
  }

  async renewSubmit() {
    this.submit = true;
    if (this.RenewSubsForm.invalid) {
      window.alert('Please Fill All Fields');
      return;
    }
    this.RenewSubsForm.value['uid'] = this.item['uid'];
    console.log('FormValue', this.RenewSubsForm.value);
    let result = await this.oper.ottrenewal(this.RenewSubsForm.value)
    console.log(result);
    if (result) {
      this.result_pop(result)
      if (result[0].error_msg == 0) this.closeModal();

    }

  }

  result_pop(item) {
    item[0] = {...item[0],viewuser:1}
    console.log('Itemmmmmmmmmmmm',item);
    
    const activemodal = this.modal.open(AddSuccessComponent, { size: 'lg', container: 'nb-layout' });
    activemodal.componentInstance.modalHeader = 'Result';
    activemodal.componentInstance.item = item;
    activemodal.result.then((data) => {
    });
  }

  createForm() {
    this.RenewSubsForm = this._formBuilder.group({
      planid: ["", Validators.required],
      pay_status: ['1', Validators.required],
      // pay_amt: [""],
      // pay_date: [""],
      comment: [""],
    });
  }

}
