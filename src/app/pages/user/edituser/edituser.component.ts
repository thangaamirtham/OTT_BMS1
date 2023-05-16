import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { businesservice, RoleService, UserService } from '../../_service/index';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'ngx-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  submit: boolean = false; EditAdminForm; data; showdist; id; editable: boolean = false;
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
    private aRoute: ActivatedRoute,
    public role: RoleService,
    private location:Location
  ) { }


  async ngOnInit() {
    // this.loading = true
    this.aRoute.queryParams.subscribe(params => {
      this.id = params.id
    });
    this.editable = true
    // this.location.replaceState('/pages/user/edit-user');
    await this.edit();
    await this.showDistributor();
    // this.loading = false;
    await this.createForm();
  }

  clearValid() {
    let role = this.val['role'];
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
      this.EditAdminForm.get(i).clearValidators();
      this.EditAdminForm.get(i).updateValueAndValidity();
    }
  }

  setValidation(...items) {
    for (let i of items) {
      this.EditAdminForm.get(i).setValidation(Validators.required);
      this.EditAdminForm.get(i).updateValueAndValidity();
    }
  }


  async editAdminuser() {
    this.submit = true;
    const invalid = [], controls = this.EditAdminForm.controls;
    for (const i in controls) {
      if (controls[i].invalid) invalid.push(i)
    }
    if (this.EditAdminForm.invalid) {
      console.log('invalid', invalid);
      window.alert('Please fill all mandatory fields');
      return
    }
    this.loading = true;
    console.log(this.EditAdminForm.value)
    let method = 'edituser';
    if (this.id) this.EditAdminForm.value['id'] = this.id
    let result = await this.user[method](this.EditAdminForm.value)
    console.log('Edit DATA', result)
    if (result) {
      this.loading = false;
      this.toastalert(result[0]['msg'], result[0]['error_msg'])
      if (result[0]['error_msg'] == 0) this.router.navigate(['/pages/user/list-user'])
    }
  }

  async edit() {
    console.log('Edit')
    let res = await this.user.getUser({ id: this.id })
    console.log('Edit data', res)
    this.editdata = res;
    await this.createForm();
     this.clearValid();
     this.showDistributor();

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
    console.log('inside distributor', this.EditAdminForm.value['role'], 'event', $event)
    if (this.EditAdminForm.value['role'] == 1) {
      this.showdist = await this.business.showdistributor({ type: 1, like: $event });
      console.log('distributor', this.showdist)
    }
    if (this.EditAdminForm.value['role'] == 2) {
      this.showsub = await this.business.showdistributor({ type: 2, like: $event });
      console.log('distributor', this.showsub)
    }

    if (this.EditAdminForm.value['role'] == 3) {
      this.showman = await this.business.showdistributor({ type: 3, like: $event });
      console.log('distributor', this.showman)
    }


  }

  createForm() {
       this.EditAdminForm = this.fb.group({
        role: new FormControl(this.editdata ? this.editdata['role_type'] : '', Validators.required),
        dmid: new FormControl(this.editdata ? this.editdata['dmid'] : ''),
        sdmid: new FormControl(this.editdata ? this.editdata['sdmid'] : ''),
        mid: new FormControl(this.editdata ? this.editdata['mid'] : ''),
        profileid: new FormControl(this.editdata ? this.editdata['profileid'] : '', Validators.required),
        fullname: new FormControl(this.editdata ? this.editdata['fullname'] : '', Validators.required),
        gender: new FormControl(this.editdata ? this.editdata['gender'] : '', Validators.required),
        email: new FormControl(this.editdata ? this.editdata['email'] : '', Validators.pattern("[0-9 A-Z a-z ,.`!@#$%^&*]*[@]{1}[a-z A-Z]*[.]{1}[a-z A-Z]{2,3}")),
        mobile: new FormControl(this.editdata ? this.editdata['mobile'] : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        // dob: new FormControl(this.editdata ? moment(this.editdata['dob']).format('YYYY-MM-DD') : '', Validators.required),
        dob: new FormControl(this.editdata ? this.editdata['dob'].slice(0, 10) : '', Validators.required),
        ustatus: new FormControl(true),

        // role: new FormControl(this.editdata['role_type'] || '', Validators.required),
        // dmid: new FormControl(this.editdata['dmid'] || ''),
        // sdmid: new FormControl(this.editdata['sdmid'] || ''),
        // mid: new FormControl(this.editdata['mid'] || ''),
        // profileid: new FormControl(this.editdata['profileid'] || '', Validators.required),
        // fullname: new FormControl(this.editdata['fullname'] || '', Validators.required),
        // gender: new FormControl(this.editdata['gender'] || '', Validators.required),
        // email: new FormControl(this.editdata['email'] || '', Validators.pattern("[0-9 A-Z a-z ,.`!@#$%^&*]*[@]{1}[a-z A-Z]*[.]{1}[a-z A-Z]{2,3}")),
        // mobile: new FormControl(this.editdata['mobile'] || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        // dob: new FormControl(moment(this.editdata['dob']).format('YYYY-MM-DD') || '', Validators.required),
        // ustatus: new FormControl(true),
      });
   }

  get val() {
    return this.EditAdminForm.value;
  }

  get ctrl() {
    return this.EditAdminForm.controls;
  }
}

