import { streamingComponent } from './streaming.component';
import { AddGroupComponent } from './live-streaming/live-streaming.component';
// import { ListGroupComponent } from './list-group/list-group.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../pages/_service/guard';

const routes: Routes = [{
  path: '',
  component: streamingComponent,
  children: [ 

  {path:'live-streaming',component: AddGroupComponent},
  // {path:'edit-group',component: AddGroupComponent, }
  ]

}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamingRoutingModule { }

export const routedComponents = [
  streamingComponent,
  AddGroupComponent,
  // ListGroupComponent,
 
];