import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import{circleservices} from '../../_service/circleservices';
//import { RoleService } from '../../_service';

@Component({
  selector: 'add-circle',
  templateUrl: './add-circle.component.html',
  // styleUrls: ['./langstyle.scss'],
})

export class AddCircleComponent implements OnInit {
  submit: boolean = false; CircleForm;cid;circlename;item;editdatas;modalHeader;
  constructor(
    private alert: ToasterService,
    public activeModal: NgbActiveModal,
    private addcircle:circleservices,
    private router:Router,

  ) { }

  async ngOnInit() {
  
    this.createForm();
    console.log(this.item)
    if(this.item){
      this.editcircle()
    }
  }
  async submitfn(){
    let method = 'addcircle'
    if(this.item){
       method = 'editcircle'
       this.CircleForm.value['cid'] = this.editdatas['cid']
    }
    
    let result = await this.addcircle[method](this.CircleForm.value)
    console.log(result)
    if(result['error']==false){
      this.activeModal.close(true)
  
    }
  
  }
    
    cancel() {
      this.router.navigate(['/pages/channel/list-channel']);
  
    }
  

  // cancel() {
  //   this.router.navigate(['/pages/channel/list-channel']);

  // }
  async editcircle(){
    this.editdatas = await this.item.edititems;
    this.createForm()
  }


  createForm() {
    this.CircleForm = new FormGroup({
      
      circlename: new FormControl(this.editdatas? this.editdatas['circlename']:'', Validators.required),
      status: new FormControl(this.editdatas ? this.editdatas['status'] == 1 ? true : false: true)

    });
  }
}
