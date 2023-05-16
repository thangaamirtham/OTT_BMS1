import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { AddlanguageCategory } from '../addlang/add-lang.component';
 import { languageservices } from '../../_service';
@Component({
  selector: 'list-lang',
  templateUrl: './list-lang.component.html',
  styleUrls:['./list-lang.component.scss']
})

export class ListlanguageCategory implements OnInit {
  data;count;
  pager: any = {}; page: number = 1;
  pagedItems: any = [];initiallist
  constructor(
    private nasmodel: NgbModal,
    private router: Router,
    private languagelist:languageservices,
  ) { }

   ngOnInit(){
   this.list();
  
}
async list(){

  let result=await this.languagelist.language_list({})
  this.data = result;
  console.log(this.data)
}

  Addcat() {
    const activeModal = this.nasmodel.open(AddlanguageCategory, { size: 'sm', container: 'nb-layout',backdrop:'static' });
    activeModal.componentInstance.modalHeader = 'Create Language Category';
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }

  edit(editdata){
    const activeModal = this.nasmodel.open(AddlanguageCategory, { size: 'sm', container: 'nb-layout',backdrop:'static' });
    activeModal.componentInstance.modalHeader = 'Edit Language Category';
    activeModal.componentInstance.item = { edititems:editdata }
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }
  
}
