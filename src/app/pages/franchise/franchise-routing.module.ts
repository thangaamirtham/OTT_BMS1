import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddfranchiseComponent } from './addfranchise/addfranchise.component';
import { ListfranchiseComponent } from './listfranchise/listfranchise.component';

const routes: Routes = [

{path :'addfranchise' , component:AddfranchiseComponent},
{path :'listfranchise', component:ListfranchiseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
