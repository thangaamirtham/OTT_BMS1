import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FranchiseRoutingModule } from './franchise-routing.module';
import { AddfranchiseComponent } from './addfranchise/addfranchise.component';
import { ListfranchiseComponent } from './listfranchise/listfranchise.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddfranchiseComponent, ListfranchiseComponent],
  imports: [
    CommonModule,
    FranchiseRoutingModule,
    ThemeModule,
    ReactiveFormsModule
  ]
})
export class FranchiseModule { }
