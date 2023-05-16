import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { AddSuccessComponent } from '../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { RoleService, businesservice, PackService } from '../../_service/index';
import { packModule } from '../pack.module';

@Component({
  selector: 'ott-plan',
  templateUrl: './ott-plan.component.html',

})

export class OTTPlanComponent implements OnInit {
  submit: boolean = false; OTTPlanForm; item; data; pro; resell
  editdatas; id; groups; ottdata; ott_id
  isReadonly = false;
  arrayBuffer: any; file: any[]; bulk = []; s = 0; f = 0; failure: any[];
  bulkOTTdata = []; bulkdata = []; dist; states; resel; deptdata; checkids;
  constructor(

    private alert: ToasterService,
    private router: Router,
    private aRoute: ActivatedRoute,
    public role: RoleService,
    public activeModal: NgbModal,
    private busser: businesservice,
    private packsrv: PackService

  ) { }

  async ottplatform($event = '', val = '') {
    this.ottdata = await this.packsrv.showOTT({ like: $event, val: val });
  }
  changeListener(file) {
    this.file = file;
    this.filereader(this.file, result => {
      this.bulk = result;
    });
  }

  filereader(file, callback) {
    if (file) {
      let fileReader = new FileReader(), filedata;
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = JSXLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        callback(JSXLSX.utils.sheet_to_json(worksheet, { raw: true }))
      }
      fileReader.readAsArrayBuffer(file);
    } else {
      callback([])
    }
  }

  async addottplan() {
    this.submit = true;
    let bulkvald: boolean = false;
    for (var i = 0; i < this.bulk.length; i++) {
      if (!this.bulk[i].hasOwnProperty('OTT Name')) {
        this.toastalert('Please fill the OTT Name in Excel Sheet');
        bulkvald = true;
        break;
      }
      else {
        let ottname = this.bulk[i]['OTT Name']
        this.bulk[i].ott_name = ottname;
      }
      if (!this.bulk[i].hasOwnProperty('UserName')) {
        this.toastalert('Please fill the UserName in Excel Sheet');
        bulkvald = true;
        break;
      }
      else {
        let uname = this.bulk[i]['UserName']
        this.bulk[i].username = uname;
      }

      if (!this.bulk[i].hasOwnProperty('Password')) {
        this.toastalert('Please fill the Password in Excel Sheet');
        bulkvald = true;
        break;
      }
      else {
        let pass = this.bulk[i]['Password'];
        this.bulk[i].password = pass;
      }
      if (!this.bulk[i].hasOwnProperty('Status')) {
        this.toastalert('Please fill the Status in Excel Sheet');
        bulkvald = true;
        break;
      }
      else {
        let status = this.bulk[i]['Status'] == 'Not Assigned' ? 0 : this.bulk[i]['Status'] == 'Assigned' ? 1 :
          this.bulk[i]['Status'] == 'Not Used' ? 2 : 3;
        this.bulk[i].status = status;
      }
      this.bulk[i].bus_id = this.OTTPlanForm.value['bus_id']
      // this.bulk[i].groupid = this.OTTPlanForm.value['groupid']
    }
    this.s = 0; this.f = 0;
    let s = 0;
    this.failure = [];
    if (this.OTTPlanForm.invalid) {
      this.submit = true;
      return;
    }
    let ottdata = [this.OTTPlanForm.value];
    let method = 'addOTTPlan';
    if (this.id) {
      method = 'editOTTPlan'
      this.OTTPlanForm.value['id'] = this.id;
    }
    let result = await this.packsrv[method]({ bulkOTTdata: ottdata })
    if (result) {
      this.reseult_pop(result);
    }
  }

  async edit() {
    let result = await this.packsrv.listOTTPlan({ id: this.id });
    if (result) {
      this.editdatas = result[0][0];
      console.log('Result', this.editdatas)
      let ids = this.editdatas['ottplatform'].split(',')
      this.checkids = ids.map(i => Number(i))
    }
    this.createForm();
  }

  async ngOnInit() {
    this.createForm();
    this.aRoute.queryParams.subscribe(param => {
      this.id = param.id || null;
    })
    if (this.id) {
      await this.edit();
      this.isReadonly = true;
    }
    await this.ottplatform();
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

  reseult_pop(item) {
    Object.assign(item, { ott: "2" });
    const activeModal = this.activeModal.open(AddSuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Result';
    activeModal.componentInstance.item = item;
    activeModal.result.then((data) => {
    });
  }

  createForm() {
    this.OTTPlanForm = new FormGroup({
      // create_type: new FormControl('', Validators.required),
      ott_vendor: new FormControl(this.editdatas ? this.editdatas['ott_vendor']:'',Validators.required),
      ottplan_name: new FormControl(this.editdatas ? this.editdatas['ottplan_name'] : '', Validators.required),
      ottplancode: new FormControl(this.editdatas ? this.editdatas['ottplancode'] : '', Validators.required),
      dayormonth: new FormControl(this.editdatas ? this.editdatas['dayormonth'] : '', Validators.required),
      otttaxtype: new FormControl(this.editdatas ? this.editdatas['otttaxtype'] : '0', Validators.required),
      ottamount: new FormControl(this.editdatas ? this.editdatas['ottamount'] : '', Validators.required),
      ottplatform: new FormControl(this.checkids ? this.checkids : '', Validators.required),
      days: new FormControl(this.editdatas ? this.editdatas['days'] : '', Validators.required),
      status: new FormControl(this.editdatas ? this.editdatas['status'] == 1 ? true : false : true, Validators.required),
    });
  }
}

