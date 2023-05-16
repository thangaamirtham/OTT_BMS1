import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectService, businesservice, sumValidator, AccountService } from '../../_service/index';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.scss']
})
export class AddmanagerComponent implements OnInit {
  addmanager: FormGroup
  submit: boolean = false; state; district; id; editdata = {}; result; showdist
  data: any; selectedfile: File = null; fileupload; imageURL: any; files; editable: boolean = false; gateway;
  constructor(
    private router: Router,
    private alert: ToasterService,
    private select: SelectService,
    private business: businesservice,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private accsrv: AccountService,

  ) { }

  ngOnInit() {
    this.addmanagersubmitf();
    this.showState();
    this.showGateway();
  }

  async showState() {
    this.state = await this.select.showState();
  }
  async showDistrict() {
    this.district = await this.select.showDistrict({ state_id: this.addmanager.value['state'] })
  }

  async showGateway() {
    this.gateway = await this.accsrv.showGateway({});
  }

  async showDistributor($event = '') {
    // console.log('inside distributor', this.addmanager.value['d1_type'])
    if (this.addmanager.value['d1_type'] != '' && this.addmanager.value['role'] == 3) {
      this.showdist = await this.business.showdistributor({ type: this.addmanager.value['d1_type'], like: $event });
      // console.log('distributor', this.showdist)
    }
    if (this.addmanager.value['role'] == 2) {
      this.showdist = await this.business.showdistributor({ type: 1, like: $event });
      // console.log('distributor', this.showdist)
    }



  }

  upload(files: FileList) {
    // console.log(files);
    this.selectedfile = files[0];
    if (this.selectedfile) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = this.sanitizer.bypassSecurityTrustUrl(event.target.result)
      }
      reader.readAsDataURL(this.selectedfile);
    } else {
      this.imageURL = '';
    }
  };

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
    // console.log('Clear', item);
    for (let i of item) {
      this.addmanager.get(i).clearValidators();
      this.addmanager.get(i).updateValueAndValidity();
    }
  }

  setValidation(...item) {
    // console.log('set', item);
    for (let i of item) {
      this.addmanager.get(i).setValidators(Validators.required);
      this.addmanager.get(i).updateValueAndValidity();
    }
  }

  changeclear(...data) {
    for (let i of data) {
      this.form[i].setValue('');
    }
  }

  async addmanagersubmit() {
    this.submit = true;
    const invalids = [], controls = this.addmanager.controls;
    for (const name in controls) {
      if (controls[name].invalid) invalids.push(name)
    }
    if (this.addmanager.invalid) {
      console.log('invalid-', invalids);
      window.alert('Please fill all manadatory fields')
      return;
    }

    const md5 = new Md5();
    this.addmanager.value['pswd'] = md5.appendStr(this.addmanager.value['password']).end()
    let method = 'addbusiness'
    let result = await this.business[method](this.addmanager.value)
    if (result[0]['error_msg'] == 0) {
      const file = new FormData();
      let id = result[0]['id']
      let filename = id + '-' + 'logo'
      file.append('file', this.selectedfile, filename)
      file.append('id', id)
      let resp = await this.business.uploadLogo(file)
      // console.log(resp)
      if (resp) this.toastalert(result[0]['msg'], result[0]['error_msg'])
      if (resp[0]['error_msg'] == 0) this.router.navigate(['/pages/manager/listmanager'])
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

  addmanagersubmitf() {
    this.addmanager = this.fb.group({
      role: new FormControl('', Validators.required),
      dis_type: new FormControl(''),
      re_type: new FormControl(''),
      d1_type: new FormControl(''),
      sub1: new FormControl(''),
      business_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.minLength(10)),
      address: new FormControl('', Validators.required),
      share: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      active: new FormControl(true, Validators.required),
      district: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      dshare: new FormControl(''),
      isp: new FormControl(''),
      reseller_share: new FormControl(''),
      sub_share: new FormControl(''),
      gstno: new FormControl('', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("[0-9 A-Z a-z ,.`!@#$%^&*]*[@]{1}[a-z A-Z]*[.]{1}[a-z A-Z]{2,3}([.]{1}[a-z A-Z]{2,3})?")]),
      pgid: new FormControl(0)
    }, {

      validator: sumValidator(100, 'dshare', 'isp', 'sub_share', 'reseller_share')
    });
  }


  get form() {
    return this.addmanager.controls;
  }
  get value() {
    return this.addmanager.value;
  }






}
