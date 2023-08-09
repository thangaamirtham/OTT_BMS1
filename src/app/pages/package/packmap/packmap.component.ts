import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as JSXLSX from 'xlsx';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { AddSuccessComponent } from '../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { businesservice,PackService} from '../../_service/index';
import { BluebackgroundDirective } from '../bluebackground.directive';
@Component({
  selector: 'ngx-packmap',
  templateUrl: './packmap.component.html',
  styleUrls: ['./packmap.component.scss']
})
export class PackmapComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';
  public loading = false; submit: boolean = false;
  bulk = []; failure: any[]; arrayBuffer: any; file: any[];
  service; bulk_meta: any; config;bulkPlanForm;resel;

  constructor(
    private alert: ToasterService,
    public activeModal: NgbModal,
    private bus: businesservice,
    private pack:PackService,

  ) { }

  async showReseller($event=''){
    this.resel = await this.bus.showdistributor({ type : 4})
    console.log('Reseller-----', this.resel)
  }

  async ngOnInit() {
    await this.createForm();
    await this.showReseller();
  }
  metaData() {
    this.bulk_meta = [
      { msg: 'Please Fill OTT_TYPE', label: 'OTT_TYPE*', assign_to: 'otttype', required: true },
      { msg: 'Please Fill GLTV_PACK_NAME', label: 'GLTV_PACK_NAME*', assign_to: 'gltvpackid', required: true },
      { msg: 'Please Fill GLTV_DAYS_TYPE', label: 'GLTV_DAYS_TYPE*', assign_to: 'gltvdaytype', required: true },
      { msg: 'Please Fill GLTV_DAYS', label: 'GLTV_DAYS*', assign_to: 'gltvdays', required: true },
      { msg: 'Please Fill OTT_PLAN_NAME', label: 'OTT_PLAN_NAME', assign_to: 'ottpid', required: false },
      { msg: 'Please Fill TAX_TYPE', label: 'TAX_TYPE*', assign_to: 'taxtype', required: true },
      { msg: 'Please Fill GLTV_AMOUNT', label: 'GLTV_AMOUNT*', assign_to: 'gltvpackamt', required: true },
      { msg: 'Please Fill OTT_PLAN_AMOUNT', label: 'OTT_PLAN_AMOUNT', assign_to: 'ottpamt', required: false },
      // { msg: 'Please Fill VENDOR', label: 'VENDOR*', assign_to: 'ott_vendor', required: true },
    ]
    return this.bulk_meta;
  }

  async bulkUpdate() {
    this.submit = true;
    if (this.bulkPlanForm.invalid || this.bulk.length == 0) {
      window.alert('Please upload file');
      return;
    }
 
    let result = this.metaData()
     for (var i = 0; i < this.bulk.length; i++) {
    console.log('bulk',this.bulk);

      for (let meta of result) {
         if (meta.required && !this.bulk[i].hasOwnProperty(meta.label)) {
          this.toastalert(meta.msg);
          return;
        } else {
          switch (meta.label) {
            case 'OTT_TYPE*':
              this.bulk[i][meta.assign_to] = this.bulk[i][meta.label] == 'GLTV_ONLY' ? 1 : 2;
              break;
            case 'GLTV_PACK_NAME*':
              this.bulk[i][meta.assign_to] = 11;
              break;
            case 'GLTV_DAYS_TYPE*':
              this.bulk[i][meta.assign_to] = this.bulk[i][meta.label] == 'DAYS' ? 1 : 2;
              break;
            case 'TAX_TYPE*':
              this.bulk[i][meta.assign_to] = this.bulk[i][meta.label] == 'INCLUSIVE' ? 0 : 1;
              break;
            // case 'VENDOR*':
            //   this.bulk[i][meta.assign_to] = this.bulk[i][meta.label] == 'M2MIT'? 1 : 2;
            //   break;
            default:
              this.bulk[i][meta.assign_to] = this.bulk[i][meta.label]
              break;
          }
        }
      };
    };
    this.loading = true;
     let resp = await this.pack.packMap({ bulkPack: this.bulk,manid:this.bulkPlanForm.value['manid'],ott_vendor:this.bulkPlanForm.value['ott_vendor'] });
    console.log('Result-----', resp);
    if (resp) {
      if (resp[0]['error_msg'] == 0) this.bulkPlanForm.controls.manid.setValue('');
      this.loading = false;
      this.result_pop(resp, true);
    } else this.loading = false;
  }

  result_pop(item, flag) {
    const activeModal = this.activeModal.open(AddSuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Result';
    activeModal.componentInstance.item = item;
    activeModal.componentInstance.limit_flag = flag;
    activeModal.result.then((data) => {

    });
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
        // console.log(JSXLSX.utils.sheet_to_json(worksheet,{raw:true}));
        callback(JSXLSX.utils.sheet_to_json(worksheet, { raw: true }))
      }
      fileReader.readAsArrayBuffer(file);
    } else {
      callback([])
    }
  };

  toastalert(msg, status = 0) {
    const toast: Toast = {
      type: status == 1 ? 'success' : 'warning',
      title: status == 1 ? 'Success' : 'Failure',
      body: msg,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
  }

  createForm() {
    this.bulkPlanForm = new FormGroup({
      manid: new FormControl('', Validators.required),
      ott_vendor:new FormControl('',Validators.required)
    })
  }
}
