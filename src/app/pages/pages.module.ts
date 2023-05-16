import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
 // import { NasModule } from './language&genre/language&genre.module';
// import {packModule } from './package/pack.module';

import { VodModule } from './vod/vod.module';


 
 
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    // NasModule,
    // packModule,
    VodModule
   ],
  declarations: [
    ...PAGES_COMPONENTS,
 
   
  ],
})
export class PagesModule {
}
