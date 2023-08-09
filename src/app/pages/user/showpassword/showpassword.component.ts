import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.scss']
})
export class ShowpasswordComponent implements OnInit {
  submit: boolean = false; AuthPassform; id; modalHeader; config;
  item; isReadOnly = true;
  constructor(
    private activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router: Router
  ) { this.id = JSON.parse(localStorage.getItem('details')) }

  closeModal() {
    this.activeModal.close();
  }
  async ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.AuthPassform = new FormGroup({
      Password: new FormControl(this.item || '--', Validators.required),

    });
  }
}