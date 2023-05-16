import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmanagerComponent } from './addmanager/addmanager.component';
import { ListmanagerComponent } from './listmanager/listmanager.component';
import { EditmanagerComponent } from './editmanager/editmanager.component';

const routes: Routes = [
  { path: 'addmanager', component: AddmanagerComponent },
  { path: 'listmanager', component: ListmanagerComponent },
  { path: 'editmanager', component: EditmanagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
