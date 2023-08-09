import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  submit: boolean = false; item; modalHeader;
  constructor(
    private alert: ToasterService,
    private router: Router,
    public activeModal: NgbActiveModal,

  ) { }

  closeModal() {
    // console.log(this.item)
    this.activeModal.close(true);
    if (this.item[0]['error_msg'] == 0) {
      this.router.navigate(['/pages/account/listdeposit']);
    }
  }

  ngOnInit() {

  }
}