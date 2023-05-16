import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddSuccessComponent } from './../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./streamingstyle.scss'],
})

export class AddGroupComponent implements OnInit {
  submit: boolean = false; AddGroupForm; groups; id; editgroups; busname; bulkgroup = [];
  bulk = []; failure: any[]; arrayBuffer: any; file: any[]; s = 0; f = 0; config;
  constructor(
    private alert: ToasterService,
    private router: Router,
    private aRoute: ActivatedRoute,
    public activeModal: NgbModal,


  ) {  }
  async ngOnInit() {
  }

  createForm() {
    
  }
}