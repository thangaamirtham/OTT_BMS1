import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { businesservice, RoleService, UserService } from '../../_service/index';
import * as moment from 'moment';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'add-adminuser',
  templateUrl: './add-adminuser.component.html',

})

export class AddAdminuserComponent implements OnInit {
  submit: boolean = false; AddAdminForm; data; showdist; id; editable: boolean = false;
  editdata = {}; showsub; showman;
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  constructor(

    private alert: ToasterService,
    private router: Router,
    private user: UserService,
    private business: businesservice,
    private fb: FormBuilder,
    public role: RoleService,

  ) { }


  async ngOnInit() {
    await this.createForm();
    if(this.role.getroleid() < 777){
      this.clearValidation('role','role_type')
    }
  }

  clearValid() {
    let role = this.val['role'];
    console.log('Role', role);

    switch (role) {
      case '1': {
        this.setValidation('dmid');
        this.clearValidation('sdmid', 'mid');
        break;
      }
      case '2': {
        this.setValidation('sdmid');
        this.clearValidation('dmid', 'mid');
        break;
      }
      case '3': {
        this.setValidation('mid');
        this.clearValidation('dmid', 'sdmid');
        break;
      }
      default: break;
    }
  }

  clearValidation(...items) {
    for (let i of items) {
      this.AddAdminForm.get(i).clearValidators();
      this.AddAdminForm.get(i).updateValueAndValidity();
    }
  }

  setValidation(...items) {
    for (let i of items) {
      this.AddAdminForm.get(i).setValidators(Validators.required);
      this.AddAdminForm.get(i).updateValueAndValidity();
    }
  }

  async addAdminuser() {
    this.submit = true;
    const invalid = [], controls = this.AddAdminForm.controls;
    for (const i in controls) {
      if (controls[i].invalid) invalid.push(i)
    }
    if (this.AddAdminForm.invalid) {
      console.log('invalid', invalid);
      window.alert('Please fill all mandatory fields');
      return
    }
    let method = 'adduser'
    if (this.id) this.AddAdminForm.value['id'] = this.id
    let result = await this.user[method](this.AddAdminForm.value)
    console.log('ADD DATA', result)
    if (result) {
      this.toastalert(result[0]['msg'], result[0]['error_msg'])
      if (result[0]['error_msg'] == 0) this.router.navigate(['/pages/user/list-user'])
    }
  }

  toastalert(msg, status = 1) {
    console.log(msg, JSON.stringify(msg), typeof (msg))
    let resp;
    if (typeof (msg) == 'object') resp = JSON.stringify(msg)
    else resp = msg
    const toast: Toast = {
      type: status == 0 ? 'success' : 'warning',
      title: status == 0 ? 'Success' : 'Failure',
      body: resp,
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
  }



  async showDistributor($event = '') {
    console.log('inside distributor', this.AddAdminForm.value['role'], 'event', $event)
    if (this.AddAdminForm.value['role'] == 1) {
      this.showdist = await this.business.showdistributor({ type: 1, like: $event });
      console.log('distributor', this.showdist)
    }
    if (this.AddAdminForm.value['role'] == 2) {
      this.showsub = await this.business.showdistributor({ type: 2, like: $event });
      console.log('distributor', this.showsub)
    }

    if (this.AddAdminForm.value['role'] == 3) {
      this.showman = await this.business.showdistributor({ type: 3, like: $event });
      console.log('distributor', this.showman)
    }


  }

  createForm() {
    this.AddAdminForm = this.fb.group({
      role: new FormControl('', Validators.required),
      sdmid: new FormControl(''),
      mid: new FormControl(''),
      profileid: new FormControl('', Validators.required),
      fullname: new FormControl('', Validators.required),
      gender: new FormControl(''),
      // email: new FormControl('', Validators.pattern("[0-9 A-Z a-z ,.`!@#$%^&*]*[@]{1}[a-z A-Z]*[.]{1}[a-z A-Z]{2,3}")),
      email: new FormControl(''),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      pwd: new FormControl('', Validators.required),
      cpsw: new FormControl('', Validators.required),
      dob: new FormControl(''),
      dmid: new FormControl(''),
      ustatus: new FormControl(true),
      role_type: new FormControl(2, Validators.required),
    });
  }

  get val() {
    return this.AddAdminForm.value;
  }

  get ctrl() {
    return this.AddAdminForm.controls;
  }
}

