import 'style-loader!angular2-toaster/toaster.css';
import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { DashboardService } from '../../../pages/_service/index';

@Component({
  selector: 'ngx-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class searchbarcomponent implements OnInit {
  submit: boolean = false; AddNasForm; datas; id; sflag = '1';
  search = ''; limit: number = 10;

  constructor(

    public activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router: Router,
    private dash : DashboardService
  ) { this.id = JSON.parse(localStorage.getItem('userid')); }

  closeModal() {
    this.activeModal.close();
  }

  async ngOnInit() {
    await this.searchresult('');
  }

  async searchresult($event='') {
    let result = await this.dash.search({ sflag: this.sflag, like: $event })
    this.datas = result;
  }

  searchclick() {
    if (this.search) {
      console.log('searc',this.search)
      localStorage.setItem('userid', JSON.stringify(this.search));
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/user/view-user']));
      this.closeModal();

    }
  }
}