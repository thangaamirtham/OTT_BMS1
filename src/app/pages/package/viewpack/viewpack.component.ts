import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'viewservice',
  templateUrl: './viewpack.component.html',
  styleUrls: ['./styles.scss'],
})

export class ViewServiceComponent implements OnInit {
  data: any = []; page: any = 1; totalpage = 10; pages = [1, 2, 3, 4, 5]; datas; item;
  pack; priceshow; index = -1; length1;packprice;

  constructor(
    private router: Router,
    private nasmodel: NgbModal,
    // private activeModal: NgbActiveModal,

  ) { this.datas = JSON.parse(localStorage.getItem('details')); }

  async ngOnInit() {
    // localStorage.removeItem('array');
    await this.view();
  }
  cancel() {
    this.router.navigate(['/pages/service/service-list']);
  }

  
  async view() {
    // console.log(result)
  }

}