import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListdepositComponent } from './listdeposit/listdeposit.component';
import { TrnstatusComponent } from './trnstatus/trnstatus.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';

const routes: Routes = [

  { path: 'deposit', component: DepositComponent },
  { path: 'listdeposit', component: ListdepositComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'trn-status', component: TrnstatusComponent },
  { path: 'online-pay', component: OnlinePaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
