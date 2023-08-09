import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.scss']
})
export class UpdateinfoComponent implements OnInit {

  submit: boolean = false; updateinfo; datas; id;


  constructor(

    public activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router: Router,
  ) { this.id = JSON.parse(localStorage.getItem('details')); }

  closeModal() {
   
    this.activeModal.close();
  }

  ngOnInit() {
    this.addNas1();
  }

  
  addNas1() {
    this.updateinfo = new FormGroup({
      fname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    });
  }
}