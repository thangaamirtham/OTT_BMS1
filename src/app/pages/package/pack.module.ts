import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { userRoutingModule, routedComponents } from './pack.routing';
import { ToasterModule } from 'angular2-toaster';
import { packaddComponent } from './packadd/packadd.component';
// import { EdituserComponent } from './edituser/edituser.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { filterModule } from '../filter/filter-module';
import { AddSuccessComponent } from './success/add-success.component';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxLoadingModule } from 'ngx-loading';
import { PackService, channelservices } from '../_service';
import { TreeModule } from 'angular-tree-component';
import { PackmapComponent } from './packmap/packmap.component';
import { UpdatepackmapComponent } from './updatepackmap/updatepackmap.component';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { OTTPlanComponent } from './ott-plan/ott-plan.component';
import { ListOTTPlanComponent } from './list-ottplan/list-ottplan.component';
import { OttcountComponent } from './ottcount/ottcount.component';
import { AllowpackComponent } from './allowpack/allowpack.component';
import { BluebackgroundDirective } from './bluebackground.directive';
import { EditServiceComponent }  from './packedit/packedit.component';
import { ViewServiceComponent } from './viewpack/viewpack.component';


// import {GrdFilterPipe} from './../filter/grd-filterpipe';


@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    userRoutingModule,
    NgMultiSelectDropDownModule,
    filterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutoCompleteNModule,
    NgxLoadingModule.forRoot({}),
    Ng2SmartTableModule,
    TreeModule,

    // GrdFilterPipe
  ],
  declarations: [
    routedComponents,
    packaddComponent,
    // EdituserComponent,
    AddSuccessComponent,
    PackmapComponent,
    UpdatepackmapComponent,
    ListOTTPlanComponent,
    OTTPlanComponent,
    OttcountComponent,
    AllowpackComponent,
    BluebackgroundDirective,
    EditServiceComponent,
    ViewServiceComponent
  ],
  entryComponents: [AddSuccessComponent, OttcountComponent
  ],
  providers: [PackService, channelservices]
})
export class packModule { }