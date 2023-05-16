import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCircleComponent } from '../add-circle/add-circle.component';
import { circleservices } from '../../_service';
@Component({
  selector: 'list-circle',
  templateUrl: './list-circle.component.html',
  styleUrls: ['./list-circle.component.scss']
})

export class ListcircleCategory implements OnInit {
  data;
  pager: any = {}; page: number = 1;
  pagedItems: any = []; initiallist
  constructor(
    private nasmodel: NgbModal,
    private router: Router,
    private circle : circleservices,
  ) { }

  ngOnInit() {
    this.list();
  }
  async list(){

    let result=await this.circle.circle_list({})
    this.data=result['data'];
    console.log(this.data)
  
  }

  add_circle() {
    const activeModal = this.nasmodel.open(AddCircleComponent, { size: 'sm', container: 'nb-layout', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = 'Add Circle';
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }

  edit(editdata){
    const activeModal = this.nasmodel.open(AddCircleComponent, { size: 'sm', container: 'nb-layout',backdrop:'static' });
    activeModal.componentInstance.modalHeader = 'Edit Circle ';
    activeModal.componentInstance.item = { edititems:editdata }
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }

}
