/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { OnlineStatusComponent } from './online-status/online-status/online-status.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngx-app',
  template: `
   <router-outlet>
   <!-- <ngx-online-status *ngIf="connectionStatus"
  [onlineStatusMessage]="connectionStatusMessage"
  [onlineStatus]="connectionStatus">
</ngx-online-status> -->
</router-outlet>
   `,
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {

  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatusMessage: string;
  public connectionStatus: string;
  status = false;

  constructor(
    private analytics: AnalyticsService,
    private activeModal: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(event => {
      this.status = false;
      console.log('ONLINE')
      this.connectionStatusMessage = 'Connected to internet! You are online';
      this.connectionStatus = 'online';
      this.modalDisplay(this.connectionStatusMessage, this.connectionStatus)
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.status = true
      console.log('OFFLINE', e)
      this.connectionStatusMessage = 'Connection lost! You are offline';
      this.connectionStatus = 'offline';
      this.modalDisplay(this.connectionStatusMessage, this.connectionStatus)
      // window.alert('Please Check Internet Connection')
    }));
  }

  modalDisplay(msg, status) {
    if (this.activeModal.hasOpenModals() == true) {
      this.activeModal.dismissAll()
    }
    if (status == 'offline') {
      const activeModal = this.activeModal.open(OnlineStatusComponent, {
        container: 'nb-layout', backdrop: 'static',
        keyboard: false, centered: true
      });
      // activeModal.componentInstance.modalHeader = 'View Graph';
      activeModal.componentInstance.item = { msg: msg, status: status };
      activeModal.result.then((data) => {

      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
