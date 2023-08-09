import { AddCompComponent } from './addlivechannel/add-channel.component';
import { ListCompComponent } from './listlivechannel/list-channel.component';
import{ ChannelComponent } from './channel.component';
import {ListlanguageCategory} from './listlang/list-lang.component';
import {ListgenreCategory} from './listgenre/list-genre.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from  '../../pages/_service/guard';  
import { ListcircleCategory } from './list-circle/list-circle.component';
import { AddlanguageCategory } from './addlang/add-lang.component';
import { Addgenrecategory } from './addgenre/add-genre.component';
import { AddCircleComponent } from './add-circle/add-circle.component';

const routes: Routes = [{
  path: '',
  component: ChannelComponent,
  children: [
 
  {path:'add-channel',component: AddCompComponent},
  {path:'list-channel',component: ListCompComponent},
  {path:'list-lang',component:ListlanguageCategory},
  {path:'list-genre',component:ListgenreCategory },
  {path:'list-circle',component:ListcircleCategory },
  {path:'addcircle',component:AddCircleComponent},

 ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class 
channelRoutingModule { }

export const routedComponents = [
  AddCompComponent,
  ListCompComponent,
  ChannelComponent,
  ListlanguageCategory,
  ListgenreCategory,
  ListcircleCategory,
  AddlanguageCategory,
  Addgenrecategory,
  AddCircleComponent 
];

export const entryComponents = [
  AddlanguageCategory,
  Addgenrecategory,
  AddCircleComponent 
]