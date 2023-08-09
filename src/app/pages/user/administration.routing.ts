import { AdminComponent } from './administration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminuserComponent } from './add-adminuser/add-adminuser.component';
import { ListAdminuserComponent } from './list-adminuser/list-adminuser.component';
import { AddSuccessComponent } from './success/add-success.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'add-user', component: AddAdminuserComponent },
    { path: 'list-user', component: ListAdminuserComponent },
    { path: 'edit-user', component: EdituserComponent, },
    { path: 'add-success', component: AddSuccessComponent },
    { path: 'view-user', component: ViewuserComponent},

  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  AddAdminuserComponent,
  ListAdminuserComponent,
  AddSuccessComponent,
  ViewuserComponent,
  EdituserComponent
 ];