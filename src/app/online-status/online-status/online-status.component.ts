import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-online-status',
  templateUrl: './online-status.component.html',
  //   template: `
  //   <div *ngIf="onlineStatus === 'online'" class="online">
  //   <span>{{ onlineStatusMessage}}</span>
  // </div>

  // <div *ngIf="onlineStatus === 'offline'" class="offline">
  //   <span>{{ onlineStatusMessage}}</span>
  // </div>
  // `
  // ,
  styleUrls: ['./online-status.component.scss']
})
export class OnlineStatusComponent implements OnInit {

  @Input() onlineStatusMessage: string;
  @Input() onlineStatus: string;

  item;

  constructor(
    private alert: ToasterService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    // console.log('inside sttaus', this.onlineStatusMessage, this.onlineStatus)
    console.log('inside status', this.item);
    if (this.item['status'] === 'online') this.closeModal();
  }

  closeModal() {
    console.log('Close');
    setTimeout(() =>{
      this.activeModal.close(true);
    },1000)
  }

}
