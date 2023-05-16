import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AccountRoutingModule } from './account-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { DepositComponent } from './deposit/deposit.component';
import { ListdepositComponent } from './listdeposit/listdeposit.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AccountService, RoleService, UserService, OperationService } from '../_service/index';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { SuccessComponent } from './success/success.component';
import { TrnstatusComponent } from './trnstatus/trnstatus.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { PayStatusCheckComponent } from './pay-status-check/pay-status-check.component';


@NgModule({
  declarations: [InvoiceComponent, DepositComponent, ListdepositComponent, SuccessComponent, TrnstatusComponent, OnlinePaymentComponent, PayStatusCheckComponent],
  imports: [
    CommonModule,
    ThemeModule,
    AccountRoutingModule,
    NgxLoadingModule,
    AutoCompleteNModule
  ],
  providers: [AccountService, RoleService, UserService, OperationService],
  entryComponents: [SuccessComponent, PayStatusCheckComponent]

})
export class AccountModule { }
