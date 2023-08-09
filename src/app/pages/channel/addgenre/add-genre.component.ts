import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { generservices,languageservices } from '../../_service';


@Component({
  selector: 'add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./genrestyle.scss'],
})
export class Addgenrecategory implements OnInit {
  submit: boolean = false; genreForm; id: any[]; resell; datas; user; config;langlistdata:any=[];item;
  ip; data; cust; mob; editdatas; comp; busname; employdata; comptypdata; subsdata;subsresel;channellang;channel;
  modalHeader;
  constructor(
    private alert: ToasterService,
    public activeModal: NgbActiveModal,
    private genre:generservices,
    private language:languageservices,
    private router: Router,

  ) {}

  async ngOnInit() {
    this.createForm();
    this.langlist();
    console.log(this.item)
    if(this.item){
      this.editgenre()
    }
}
async add(){
  let method = 'addgenre'
  if(this.item){
     method = 'editgenre'
     this.genreForm.value['genre_id'] = this.editdatas['genre_id']
  }
//  console.log(this.genreForm.value['genre_id'])
  let result=await this.genre[method](this.genreForm.value)
  this.data=result['data'];
  console.log(this.data)
    if (result[0]['error_msg'] == 0) {  //edit
      this.toastalert(result[0]['msg'], result[0]['error_msg'])
      this.activeModal.close(true)
    } else{
      this.toastalert(result[0]['msg'], result[0]['error_msg'])

    }

}


toastalert(msg, status = 1) {
  console.log(msg, JSON.stringify(msg), typeof (msg))
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


async langlist(){
  let result=await this.language.language_list({})
   this.langlistdata=result;
 }
async editgenre(){
  this.editdatas = await this.item.edititems;
  this.createForm();
}
  
  cancel() {
    this.router.navigate(['/pages/channel/list-channel']);
  }

  createForm() {
    this.genreForm = new FormGroup({
      lang_id: new FormControl(this.editdatas? this.editdatas['lang_id']:'', Validators.required),
      genre_name:new FormControl(this.editdatas? this.editdatas['genre_name']:'', Validators.required),
      status: new FormControl(this.editdatas ? this.editdatas['status'] == 1 ? true : false: true)
    });
  }
}