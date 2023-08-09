import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddSuccessComponent } from '../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbAccordionItemComponent } from '@nebular/theme';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'edit-service',
  templateUrl: './packedit.component.html',
  styles: ['hr{border: 0px;}']
})

export class EditServiceComponent implements OnInit {
  submit: boolean = false; EditServiceForm; id; editdatas; busname; nasips
  resell; buresellitems; nasresel; grup; reseldata; edititems; idnas; res_id; bulkService = [];
  editprice; config; falback; svst_date; svend_date;

  constructor(
    private alert: ToasterService,
    private router: Router,
    private _fb: FormBuilder,
    public activeModal: NgbModal,
    private datePipe: DatePipe

  ) { this.id = JSON.parse(localStorage.getItem('array')); }

  async group() {
  }

  async business() {
 }

  async busresell() {

  }

  async resellcheck(check) {
    await this.buresellitems.forEach(x => x.datas = check)
  }

  async ngOnInit() {
      }

  cancel() {
    this.router.navigate(['/pages/service/service-list']);
  }

  async edit() {
  }

  get priceDetails(): FormArray {
    return this.EditServiceForm.get('priceDetails') as FormArray;
  }
  addPrice() {
    this.priceDetails.push(this.createMaterial());
  }
  deletepriceField(index: number) {
    this.priceDetails.removeAt(index);
  }
  createMaterial(plan = '', serprice = '', timeunit = '', timetype = '', addays = ''): FormGroup {
    return this._fb.group({
      sub_plan: [plan],
      ser_price: [serprice],
      time_unit: [timeunit],
      timeunit_type: [timetype],
      add_days: [addays],
    });
  }

  createForm() {
    this.EditServiceForm = new FormGroup({
      // serassign_type: new FormControl(this.editdatas ? this.editdatas : ''),
      bus_id: new FormControl(this.editdatas ? this.editdatas['isp_id'] : '',Validators.required),
      groupid: new FormControl(this.editdatas ? this.editdatas['group_id'] : ''),
      Name: new FormControl(this.editdatas ? this.editdatas['srvname'] : '',Validators.required),
      Type: new FormControl(this.editdatas ? this.editdatas['srvmode'] : '',Validators.required),
      ciscopolicy: new FormControl(this.editdatas ? this.editdatas['policy'] : ''),
      cisco_dl: new FormControl(this.editdatas ? this.editdatas['policymapdl'] : ''),
      cisco_ul: new FormControl(this.editdatas ? this.editdatas['policymapul'] : ''),
      datadl_rate: new FormControl(this.editdatas ? this.editdatas['downrate'] : ''),
      dataul_rate: new FormControl(this.editdatas ? this.editdatas['uprate'] : ''),
      Service: new FormControl(this.editdatas ? (this.editdatas['srvtype']) : '',Validators.required),
      Expiry: new FormControl(this.editdatas ? this.editdatas['limitexpiration'] : '',Validators.required),
      ser_validity: new FormControl(this.editdatas ? this.editdatas['svalidity'] : ''),
      st_date: new FormControl(''),
      end_date: new FormControl(''),
      data_split: new FormControl(this.editdatas ? this.editdatas['datasplit'] : ''),
      serstatus: new FormControl(this.editdatas ? this.editdatas['enableservice'] : ''),
      Data: new FormControl(this.editdatas ? this.editdatas['srvdatatype'] : '',Validators.required),
      Total: new FormControl(this.editdatas ? (this.editdatas['limitcomb'] == 0 ? this.editdatas['limitcomb'] = false : this.editdatas['limitcomb'] = true) : ''),
      tTraffic: new FormControl(this.editdatas ? this.editdatas['trafficunitcomb'] : ''),
      tottraf_initial: new FormControl(this.editdatas ? this.editdatas['inittotal'] : ''),
      Download: new FormControl(this.editdatas ? (this.editdatas['limitdl'] == 0 ? this.editdatas['limitdl'] = false : this.editdatas['limitdl'] = true) : ''),
      dTraffic: new FormControl(this.editdatas ? this.editdatas['trafficunitdl'] : ''),
      dltraf_initial: new FormControl(this.editdatas ? this.editdatas['initdl'] : ''),
      Upload: new FormControl(this.editdatas ? this.editdatas['limitul'] : ''),
      uTraffic: new FormControl(this.editdatas ? this.editdatas['trafficunitul'] : ''),
      ultraf_initial: new FormControl(this.editdatas ? this.editdatas['initul'] : ''),
      Online: new FormControl(this.editdatas ? this.editdatas['limituptime'] : ''),
      ontime: new FormControl(this.editdatas ? this.editdatas['timeunitonline'] : ''),
      initial: new FormControl(this.editdatas ? this.editdatas['inittimeonline'] : ''),
      timeunit: new FormControl(this.editdatas ? this.editdatas['timebaseonline'] : ''),
      // quota: new FormControl(this.editdatas ? this.editdatas['d_quota'] : ''),
      dQuota: new FormControl(this.editdatas ? this.editdatas['dlquota'] : '0'),
      uQuota: new FormControl(this.editdatas ? this.editdatas['uQuota'] : '0'),
      // tot_quota: new FormControl(this.editdatas ? this.editdatas['tot_quota'] : ''),
      tQuota: new FormControl(this.editdatas ? this.editdatas['combquota'] : '0'),
      sQuota: new FormControl(this.editdatas ? this.editdatas['timequota'] : ''),
      disable_ser: new FormControl(this.editdatas ? this.editdatas['disnextsrvid'] : ''),
      exp_service: new FormControl(this.editdatas ? this.editdatas['nextsrvid'] : ''),
      daily_service: new FormControl(this.editdatas ? this.editdatas['dailynextsrvid'] : ''),
      burst_mode: new FormControl(this.editdatas ? this.editdatas['enableburst'] : ''),
      Limit: new FormControl(this.editdatas ? this.editdatas['dlburstlimit'] : ''),
      Limit1: new FormControl(this.editdatas ? this.editdatas['ulburstlimit'] : ''),
      Priority: new FormControl(this.editdatas ? this.editdatas['priority'] : ''),
      Treshold: new FormControl(this.editdatas ? this.editdatas['dlburstthreshold'] : ''),
      Treshold1: new FormControl(this.editdatas ? this.editdatas['ulburstthreshold'] : ''),
      Time: new FormControl(this.editdatas ? this.editdatas['dlbursttime'] : ''),
      Time1: new FormControl(this.editdatas ? this.editdatas['ulbursttime'] : ''),
      carry_over: new FormControl(this.editdatas ? this.editdatas['carryover'] : ''),
      reset_dateexp: new FormControl(this.editdatas ? this.editdatas['resetctrdate'] : ''),
      traffic_neg: new FormControl(this.editdatas ? this.editdatas['resetctrneg'] : ''),
      add_credits: new FormControl(this.editdatas ? this.editdatas['enaddcredits'] : ''),
      srvtype: new FormControl(JSON.stringify(this.editdatas ? this.editdatas['timeaddmodeexp'] : '')),
      srvtype1: new FormControl(JSON.stringify(this.editdatas ? this.editdatas['timeaddmodeonline'] : '')),
      srvtype2: new FormControl(JSON.stringify(this.editdatas ? this.editdatas['trafficaddmode'] : '')),
      expdate_unit: new FormControl(this.editdatas ? this.editdatas['timeunitexp'] : ''),
      exp_initial: new FormControl(this.editdatas ? this.editdatas['inittimeexp'] : ''),
      exp_period: new FormControl(this.editdatas ? this.editdatas['timebaseexp'] : ''),
      minbase_qty: new FormControl(this.editdatas ? this.editdatas['minamount'] : ''),
      addtrafic_unit: new FormControl(this.editdatas ? this.editdatas['addamount'] : ''),
      minadd_qty: new FormControl(this.editdatas ? this.editdatas['minamountadd'] : ''),
      resell_name: new FormControl(this.editdatas ? this.editdatas['managername'] : ''),
      ass_nas: new FormControl(this.editdatas ? this.editdatas['nasid'] : ''),
      ser_tax: new FormControl(true),
      sertax_cal: new FormControl(''),
      price_status: new FormControl(''),
      ser_valid: new FormControl(''),
      stprice_date: new FormControl(''),
      endprice_date: new FormControl(''),
      priceDetails: new FormArray([
        this.createMaterial()
      ]),
    });
  }

}