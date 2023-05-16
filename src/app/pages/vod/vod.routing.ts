import { VodComponent } from './vod.component';
import { AddvodComponent } from './add-vod/addvod.component';
import { ListvodComponent } from './list-vod/vodList.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../pages/_service/guard';
const routes: Routes = [{
  path: '',
  component: VodComponent,
  children: [
  {path: 'addvod',component: AddvodComponent},
  {path: 'vodList',component: ListvodComponent},
  {path: 'editvod',component: AddvodComponent, },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VODRoutingModule { }

export const routedComponents = [
  VodComponent,
  AddvodComponent,
  ListvodComponent,
];