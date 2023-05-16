import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_service/index';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'ngx-change-validity',
  templateUrl: './change-validity.component.html',
  styleUrls: ['./change-validity.component.scss']
})
export class ChangeValidityComponent implements OnInit {
  submit: boolean = false; ChangevalidityForm;  modalHeader; item; data;  

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes; servtype; custname;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private userService: UserService,
     private router: Router

  ) { }

  closeModal() {
    this.activeModal.close();
   }

  async ngOnInit() {
    console.log('Expiration Date',this.item);
      if(this.item.expdate) this.item.expdate = this.item.expdate.split('.')[0]
     this.createForm();
  }

 
  async formSubmit() {
     if (this.ChangevalidityForm.invalid) {
      this.submit = true;
      return;
    }
    this.value['id'] = this.item.uid;
     
    let result = await this.userService.changeValidity( this.value)
    this.data = result
     const toast: Toast = {
      type: result[0]['error_msg'] == 0 ? 'success' : 'warning',
      title: result[0]['error_msg'] == 0 ? 'Success' : 'Failure',
      body: result[0]['msg'],
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
    if (result[0]['error_msg'] == 0) {
      this.closeModal();
    }
  }

  createForm() {
    this.ChangevalidityForm = new FormGroup({
      validity: new FormControl(this.item.expdate || '', Validators.required),
      reason: new FormControl('', Validators.required),
    });
  }

  get ctrl(){
    return this.ChangevalidityForm.controls
  }

  get value(){
    return this.ChangevalidityForm.value
  }
}