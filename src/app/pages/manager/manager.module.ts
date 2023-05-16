import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRoutingModule } from './manager-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AddmanagerComponent } from './addmanager/addmanager.component';
import { ListmanagerComponent } from './listmanager/listmanager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { LogoupdateComponent } from './logoupdate/logoupdate.component';
import { NgxLoadingModule } from 'ngx-loading';
import { EditmanagerComponent } from './editmanager/editmanager.component';

@NgModule({
  declarations: [AddmanagerComponent, ListmanagerComponent, LogoupdateComponent, EditmanagerComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ThemeModule,
    AutoCompleteNModule,
    ReactiveFormsModule,
    NgxLoadingModule
  ],
    entryComponents:[
      LogoupdateComponent
    ]
   
})
export class ManagerModule { }
