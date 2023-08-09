import 'style-loader!angular2-toaster/toaster.css';
import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';



@Component({
  selector: 'ngx-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})


export class ChangepasswordComponent implements OnInit {

  submit: boolean = false; AddNasForm; datas; id;


  constructor(

    public activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router: Router,
  ) { this.id = JSON.parse(localStorage.getItem('details')); }

  closeModal() {
    // console.log("close")
    this.activeModal.close();
  }

  ngOnInit() {
    this.createForm();
  }

  async addNas() {
    if (this.AddNasForm.invalid || this.AddNasForm.value['Password'] != this.AddNasForm.value['CPassword']) {
      this.submit = true;
      return;
    }

    // this.AddNasForm.value['id'] = this.id;
    const md5 = new Md5;
    this.AddNasForm.value['password_en'] = md5.appendStr(this.AddNasForm.value['Password']).end();
    // console.log("Adnas",this.AddNasForm.value)

   


  }

  createForm() {
    this.AddNasForm = new FormGroup({
      Password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$')]),
      CPassword: new FormControl('', Validators.required)
    });
  }
}