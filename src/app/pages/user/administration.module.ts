import { NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule, routedComponents } from './administration.routing';
import { ToasterModule } from 'angular2-toaster';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { TreeModule } from 'angular-tree-component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { CKEditorModule} from 'ckeditor4-angular';
import { CKEditorModule} from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService,PackService,RoleService,OperationService } from './../_service/index';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { RenewuserComponent } from './renewuser/renewuser.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ShowpasswordComponent } from './showpassword/showpassword.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ChangeValidityComponent } from './change-validity/change-validity.component';

  
@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    AdminRoutingModule,
    AutoCompleteNModule,
    TreeModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    Ng2SmartTableModule,
    CKEditorModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule
    ],
  declarations: [
    routedComponents,
    ChangepasswordComponent,
    ViewuserComponent,
    RenewuserComponent,
    ShowpasswordComponent,
    EdituserComponent,
    ChangeValidityComponent,
    //  ReadonlyDirective,

  ],
  entryComponents: [RenewuserComponent,ChangepasswordComponent,ShowpasswordComponent,ChangeValidityComponent
  ],
  providers: [ NgbActiveModal,UserService,RoleService,PackService,OperationService],
})


export class AdminModule { }