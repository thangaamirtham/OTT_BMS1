import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectService, businesservice, sumValidator, AccountService } from '../../_service/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-editmanager',
  templateUrl: './editmanager.component.html',
  styleUrls: ['./editmanager.component.scss']
})
export class EditmanagerComponent implements OnInit {
  editmanager: FormGroup
  submit: boolean = false; state; district; id; editdata = {}; result; showdist
  data: any; selectedfile: File = null; fileupload; imageURL: any; files; editable: boolean = false; gateway;
  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private alert: ToasterService,
    private select: SelectService,
    private business: businesservice,
    private fb: FormBuilder,
    private accsrv: AccountService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe(params => {
      this.id = params.id || null
    })
    if (this.id) {
      // this.location.replaceState('/pages/manager/editmanager')
      this.editable = true
      this.edit();
    }
    this.editmanagersubmitf();
    this.showState();
    this.showGateway();
  }

  async edit() {
    this.editdata = await this.business.getbusinessedit({ id: this.id })
    // console.log('Data for edit', this.editdata);

    await this.editmanagersubmitf();
    await this.showDistributor();
    await this.typeClear();
  }

  async showState() {
    this.state = await this.select.showState();
  }
  async showDistrict() {
    this.district = await this.select.showDistrict({ state_id: this.editmanager.value['state'] })
  }

  async showGateway() {
    this.gateway = await this.accsrv.showGateway({});
  }

  async showDistributor($event = '') {
    // console.log('inside distributor', this.editmanager.value['d1_type'])
    if (this.editmanager.value['d1_type'] != '' && this.editmanager.value['role'] == 3) {
      this.showdist = await this.business.showdistributor({ type: this.editmanager.value['d1_type'], like: $event });
    }
    if (this.editmanager.value['role'] == 2) {
      this.showdist = await this.business.showdistributor({ type: 1, like: $event });
    }
  }

  changeclear(...data) {
    for (let i of data) {
      this.editmanager.controls[i].setValue('');
    }
  }

  async editmanagersubmit() {
    this.submit = true;
    const invalid = [], controls = this.editmanager.controls;
    for (const name in controls) {
      if (controls[name].invalid) invalid.push(name)
    }
    if (this.editmanager.invalid) {
      console.log('invalid-', invalid);
      window.alert('Please fill all manadatory fields')
      return;
    }
    let method = 'editBusiness'
    if (this.id) this.editmanager.value['id'] = this.id
    let result = await this.business[method](this.editmanager.value)
    if (result[0]['error_msg'] == 0) {
      this.toastalert(result[0]['msg'], result[0]['error_msg'])
      this.router.navigate(['/pages/manager/listmanager'])
    } else {
      this.toastalert(result[0]['msg'], result[0]['error_msg'])
    }
  }

  toastalert(msg, status = 1) {
    // console.log(msg, JSON.stringify(msg), typeof (msg))
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

  typeClear() {
    let val = this.value['role'], type = this.value['re_type'] || '0', type1 = this.value['d1_type'] || '0';
    // console.log('Data', val, type, type1);

    switch (val) {
      case '1':
        this.clearValidation('re_type', 'd1_type', 'sub1', 'dis_type');
        break;
      case '2':
        {
          this.clearValidation('re_type', 'd1_type', 'sub1');
          this.setValidation('dis_type');
          break;
        }
      case '3': {
        this.setValidation('re_type');
        if (type == '1' && type1 == '0') {
          this.clearValidation('d1_type', 'sub1', 'dis_type');
        }
        if (type1 == '2') {
          this.setValidation('d1_type')
        }
        if (type == '2' && type1 == '1') {
          this.clearValidation('sub1');
          this.setValidation('dis_type');
        }
        if (type == '2' && type1 == '2') {
          this.clearValidation('dis_type');
          this.setValidation('sub1');
        }
        break;
      }
      default: break;
    }
  }

  clearShare() {
    let val = ['isp', 'dshare', 'sub_share', 'reseller_share']
    for (let i of val) {
      this.form[i].setValue('');
    }
  }

  clearValidation(...item) {
    for (let i of item) {
      this.editmanager.get(i).clearValidators();
      this.editmanager.get(i).updateValueAndValidity();
    }
  }

  setValidation(...item) {
    for (let i of item) {
      this.editmanager.get(i).setValidators(Validators.required);
      this.editmanager.get(i).updateValueAndValidity();
    }
  }

  editmanagersubmitf() {
    this.editmanager = this.fb.group({
      role: new FormControl(this.editdata['role'] == 555 ? 3 : this.editdata['role'] == 666 ? 2 : this.editdata['role'] == 777 ? 1 : '' || '', Validators.required),
      dis_type: new FormControl(this.editdata['dmid'] || ''),
      re_type: new FormControl(this.editdata['under_man'] == 0 ? 1 : 2 || ''),
      d1_type: new FormControl(this.editdata['under_man'] == 1 ? 1 : this.editdata['under_man'] == 2 ? 2 : '' || ''),
      sub1: new FormControl(this.editdata['sdmid'] || ''),
      business_name: new FormControl(this.editdata['bname'] || '', Validators.required),
      fname: new FormControl(this.editdata['fname'] || '', Validators.required),
      gender: new FormControl(this.editdata['gender'] || '', Validators.required),
      login: new FormControl(this.editdata['userid'] || '', Validators.required),
      phone: new FormControl(this.editdata['phone'] || '', Validators.minLength(10)),
      address: new FormControl(this.editdata['address'] || '', Validators.required),
      share: new FormControl(this.editdata['sharetype'] || '', Validators.required),
      state: new FormControl(this.editdata['state'] || '', Validators.required),
      active: new FormControl(this.editdata['status'] || true, Validators.required),
      district: new FormControl(this.editdata['city'] || '', Validators.required),
      pincode: new FormControl(this.editdata['pincode'] || '', Validators.required),
      dshare: new FormControl(this.editdata['dshare'] || ''),
      isp: new FormControl(this.editdata['bshare'] || ''),
      reseller_share: new FormControl(this.editdata['mshare'] || ''),
      sub_share: new FormControl(this.editdata['sdshare'] || ''),
      gstno: new FormControl(this.editdata['gstno'] || '', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")),
      mobile: new FormControl(this.editdata['mobile'] || '', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl(this.editdata['email'] || '', [Validators.required, Validators.pattern("[0-9 A-Z a-z ,.`!@#$%^&*]*[@]{1}[a-z A-Z]*[.]{1}[a-z A-Z]{2,3}([.]{1}[a-z A-Z]{2,3})?")]),
      pgid: new FormControl(this.editdata['pgid'] || 0)
    }, {
      validator: sumValidator(100, 'dshare', 'isp', 'sub_share', 'reseller_share')
    });
  }


  get form() {
    return this.editmanager.controls;
  }
  get value() {
    return this.editmanager.value;
  }





}
