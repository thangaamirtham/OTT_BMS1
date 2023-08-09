import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_service/index';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({

  selector: 'ngx-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']

})

export class ChangepasswordComponent implements OnInit {
  submit: boolean = false; ChangePassForm; datas; id; modalHeader;item;

  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router: Router,
    private user: UserService
  ) { this.id = JSON.parse(localStorage.getItem('details')) }

  closeModal() {
    this.activeModal.close();
   }

  ngOnInit() {
    this.createForm();

  }
  
  async ChangePassword() {
    this.submit = true;
    if(this.ChangePassForm.invalid  || this.ChangePassForm.value['Password'] != this.ChangePassForm.value['CPassword']){
      window.alert('Please fill mandatory fields or check confirm password');
      return
    }
    this.ChangePassForm.value['id'] = this.item;
    const md5 = new Md5;
    this.ChangePassForm.value['password_en'] = md5.appendStr(this.ChangePassForm.value['Password']).end();
    console.log('Form Value', this.ChangePassForm.value,this.item)
    let result = await this.user.changeProfilePwd(this.ChangePassForm.value);
    if(result){
      console.log('Result', result)
      this.toastalert(result['msg'],result['status'])
      if(result['status'] == 1) this.closeModal();
    }


  }

  toastalert(msg,status=0){
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


  createForm() {
    this.ChangePassForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      CPassword: new FormControl('', Validators.required)

    });
  }
}
