import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService, RoleService,channelservices,generservices,languageservices } from '../../_service/index';
import { validateConfig } from '@angular/router/src/config';


@Component({
  selector: 'add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./channelstyle.scss'],
})

export class AddCompComponent implements OnInit {
  submit: boolean = false; addchannelform; langdata:any=[];genredata:any=[];data:any;langlistdata
  editdatas = {};item;id ;channel_id;editable;config;
  constructor(
    private alert: ToasterService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private channel:channelservices,
    private genre:generservices,
    private language:languageservices

  ) { 
    this.item = JSON.parse(localStorage.getItem('array'))

  }

  async ngOnInit() {

    this.aRoute.queryParams.subscribe(params => {
      this.id = params.id
    });
    console.log('Item', this.id)
      this.createForm()
    if (this.id) {
      this.editable = true
      await this.edit();
    }
    
    this.langlist(),this.listgenre();


}
  
async add()  {
  this.submit = true;
  console.log(this.addchannelform.value)
  let method = this.id ? 'editchannels' : 'Addchannels'
  if (this.id) this.addchannelform.value['id'] = this.id
  let result = await this.channel[method](this.addchannelform.value)
  console.log('ADD DATA', result)
  if (result) {
    this.toastalert(result[0]['msg'], result[0]['error_msg'])
    if (result[0]['error_msg'] == 0) this.router.navigate(['/pages/channel/list-channel'])
  }
}









async listgenre(){
  if(this.addchannelform.value['lang_id']){
    let result=await this.genre.genre_get({lang_id:this.addchannelform.value['lang_id']})
    this.genredata=result;
    console.log(this.genredata)
  }
}
async langlist(){
  let result=await this.language.language_list({})
  console.log(result);
  this.langlistdata=result;
  console.log(this.langlistdata)
}
 
  
  cancel() {
    this.router.navigate(['/pages/channel/list-channel']);

  }
  

 async edit()   {
    console.log('Edit')
    let res = await this.channel.listchannels({ id: this.id })
    console.log('Edit channel', res)
    this.editdatas = res[0][0]
    await this.createForm();
 

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



  createForm() {
  
    this.addchannelform = new FormGroup({
      channel_name:  new FormControl(this.editdatas ? this.editdatas['channel_name'] : ''),
      channel_lcn:  new FormControl(this.editdatas ? this.editdatas['channel_lcn'] : ''),
      live_url: new FormControl(this.editdatas ? this.editdatas['live_url'] : ''),
      channel_type:  new FormControl(this.editdatas ? this.editdatas['channel_type'] : ''),
      channel_mode:  new FormControl(this.editdatas ? this.editdatas['channel_mode'] : ''),
      genre_id:  new FormControl(this.editdatas ? this.editdatas['genre_id'] : ''),
      lang_id:  new FormControl(this.editdatas ? this.editdatas['lang_id'] : ''),
      clogo:  new FormControl(this.editdatas ? this.editdatas['clogo'] : ''),
      desc:  new FormControl(this.editdatas ? this.editdatas['desc'] : ''),
      status:  new FormControl(this.editdatas ? this.editdatas['status'] : ''),
    });
  }
}