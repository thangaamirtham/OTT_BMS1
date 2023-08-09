/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToasterModule,ToasterService } from 'angular2-toaster';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logoutcomponent';
 import { RoleService,LogService,JwtInterceptor,ErrorInterceptor,SelectService  } from './pages/_service';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { businesservice } from './pages/_service/businesservice';
import { OnlineStatusComponent } from './online-status/online-status/online-status.component';
    
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ConfirmationDialogComponent,
    OnlineStatusComponent,

      // AddSuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    ],
  entryComponents:[
    // AddSuccessComponent,
    ConfirmationDialogComponent,
    OnlineStatusComponent
  ],
  bootstrap: [AppComponent],
  providers: [LogService,ToasterService,RoleService,SelectService,businesservice
,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
