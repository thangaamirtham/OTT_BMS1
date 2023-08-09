import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';
 import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 import { languageservices } from '../../_service';

@Component({
  selector: 'add-lang',
  templateUrl: './add-lang.component.html',
  styleUrls: ['./langstyle.scss'],
})

export class AddlanguageCategory implements OnInit {
  submit: boolean = false; languageForm; id: any[]; resell; datas; user; config;item;
  ip; data; cust; mob; editdatas; comp; busname; employdata; comptypdata; subsdata;subsresel;channellang;channel;
  modalHeader;
  constructor(
    private alert: ToasterService,
    public activeModal: NgbActiveModal,
    private addlanguage:languageservices,
    private router:Router,

  ) { }

  async ngOnInit() {
    this.createForm();
    console.log(this.item)
    if(this.item){
      this.editlang()
    }
}
async submitfn(){
  let method = 'language_add'
  if(this.item){
     method = 'language_edit'
     this.languageForm.value['lang_id'] = this.editdatas['lang_id']
  }
  
  let result = await this.addlanguage[method](this.languageForm.value)
  console.log(result)
  if(result['error']==false){
    this.activeModal.close(true)

  }
}
  
  cancel() {
    this.activeModal.close(true)

  }

  async editlang(){
    this.editdatas = await this.item.edititems;
    this.createForm()
  }

 

  createForm() {
    this.languageForm = new FormGroup({
      language_name: new FormControl(this.editdatas? this.editdatas['language_name']:'', Validators.required),
      status: new FormControl(this.editdatas ? this.editdatas['status'] == 1 ? true : false: true)
    });
  }
}
