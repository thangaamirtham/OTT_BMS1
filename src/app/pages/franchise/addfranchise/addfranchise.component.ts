import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'ngx-addfranchise',
  templateUrl: './addfranchise.component.html',
  styleUrls: ['./addfranchise.component.scss']
})
export class AddfranchiseComponent implements OnInit {
  addfranchise:FormGroup
  submit:boolean =false;id;
  constructor( private alert: ToasterService,
    private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addfranchisef();
    this.aRoute.queryParams.subscribe(param => {
      this.id = param.id || null;
    })
    console.log('id',this.id)
    
  }
    
  addfranchisef() {
    this.addfranchise = new FormGroup({
      user_name: new FormControl( '',Validators.required),
    password: new FormControl('',Validators.required),
      first_name: new FormControl('',Validators.required),
      bname: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      status: new FormControl('',Validators.required),
      igst: new FormControl('',Validators.required),
      cgst:new FormControl('',Validators.required),
      sgst:new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required),
      share:new FormControl('',Validators.required),
      circle:new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required),
      Pan:  new FormControl('',Validators.required),
      hsn: new FormControl('',Validators.required),
      mobile: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      b_share:new FormControl('',Validators.required),
      d_share:new FormControl('',Validators.required),
      sd_share:new FormControl('',Validators.required),
      r_share:new FormControl('',Validators.required),
      gstno:new FormControl('',Validators.required),
      service:new FormControl('',Validators.required),

    });

 
  }
  

  get form() {
    return this.addfranchise.controls;
  }
  
  
  franchisesubmit()
  {
    this.submit=true;
    console.log(this.addfranchise.value)
  
    
  }

}