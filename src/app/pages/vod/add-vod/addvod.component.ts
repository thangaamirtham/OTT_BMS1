import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Netmask } from 'netmask';
import { getIPRange } from 'get-ip-range';
import { AddSuccessComponent } from './../success/add-success.component';
// import { GroupService, RoleService, BusinessService, SelectService, IppoolService, NasService } from '../../_service/indexService';

@Component({
  selector: 'add-vod',
  templateUrl: './addvod.component.html',
  // styleUrls:['./custstyle.scss'],
})

export class AddvodComponent implements OnInit {
  submit: boolean = false; AddIPForm; item; datas; editdatas; ip; items; busname; grup; anas;
  ippool = []; config;addIPPool;
  constructor(
    private alert: ToasterService,
    private router: Router,
    private aRouter: ActivatedRoute,
    public activeModal: NgbModal,
    // public iprange:etmask,

  ) { }
  async ngOnInit() {
this.createForm();
}
 
  createForm() {

    this.AddIPForm = new FormGroup({
         vod_name: new FormControl( ''),
      chn_ctgry: new FormControl(''),
      strm_url: new FormControl( ''),
      lang: new FormControl( ''),
      img_up: new FormControl( ''),
      desc: new FormControl( ''),
      status: new FormControl( ''),
      relsd_date:new FormControl(''),
      // net_mask :new FormControl(this.editdatas?this.editdatas['']:''),
      // gate:new FormControl(this.editdatas?this.editdatas['']:''),

    });
  }
}