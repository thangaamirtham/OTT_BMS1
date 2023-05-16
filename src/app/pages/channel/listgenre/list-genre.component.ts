import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Addgenrecategory } from '../addgenre/add-genre.component';
import { generservices } from '../../_service';

@Component({
  selector: 'list-genre',
  templateUrl: './list-genre.component.html',
})

export class ListgenreCategory implements OnInit {
  data; count;
  pager: any = {}; page: number = 1;
  pagedItems: any = []; initiallist;download;
  constructor(
    private nasmodel: NgbModal,
    private router: Router,
    private listgener: generservices,

  ) { }

  async ngOnInit() {
    await this.list();
  }
  async list() {
    let result = await this.listgener.genre_list({})
    this.data = result[0]; this.count = result[1].count
  }


  Addgen() {
    const activeModal = this.nasmodel.open(Addgenrecategory, { size: 'sm', container: 'nb-layout', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = 'Add Genre';
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }

  edit(editdata) {
    const activeModal = this.nasmodel.open(Addgenrecategory, { size: 'sm', container: 'nb-layout', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = 'Edit Genre';
    activeModal.componentInstance.item = { edititems: editdata }
    activeModal.result.then((data) => {
      this.list();
    }, (reason) => {
      return;
    });
  }

}
