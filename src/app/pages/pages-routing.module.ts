import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent
  },
  
  // { path:'iot-dashboard/:status/:msg/:txnid', component: DashboardComponent },

  {
    path: 'iot-dashboard',
    component: DashboardComponent
  },

  // {
  //   path: 'ui-features',
  //   loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  // }, 
  // {
  //   path: 'modal-overlays',
  //   loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  // }, 
  // {
  //   path: 'extra-components',
  //   loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  // }, 
  // {
  //   path: 'bootstrap',
  //   loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  // }, 
  // {
  //   path: 'maps',
  //   loadChildren: './maps/maps.module#MapsModule',
  // }, 
  // {
  //   path: 'charts',
  //   loadChildren: './charts/charts.module#ChartsModule',
  // }, 
  // {
  //   path: 'editors',
  //   loadChildren: './editors/editors.module#EditorsModule',
  // }, 
  // {
  //   path: 'forms',
  //   loadChildren: './forms/forms.module#FormsModule',
  // },
  //  {
  //   path: 'tables',
  //   loadChildren: './tables/tables.module#TablesModule',
  // },
  //  {
  //   path: 'miscellaneous',
  //   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  // }, 
  // {
  //   path: 'business',
  //   loadChildren: './business/business.module#BusinessModule',
  // },
 
  // {
  //   path: 'streaming',
  //   loadChildren: './streaming/streaming.module#StreamingModule',
  // },
  // {
  //   path: 'vod',
  //   loadChildren: './vod/vod.module#VodModule',
  // },
 
  {
    path: 'package',
    loadChildren: './package/pack.module#packModule',
  },
  
  
  {
    path: 'user',
    loadChildren: './user/administration.module#AdminModule',
  },

  // {
  //   path: 'reports',
  //   loadChildren: './reports/reports.module#ReportsModule',
  // },
  // {
  //   path: 'enquiry',
  //   loadChildren: './enquiry/enquiry.module#EnquiryModule',
  // },
  {
    path: 'channel',
    loadChildren: './channel/channel.module#channelModule',
  },
    
  {
    path: 'franchise',
    loadChildren: './franchise/franchise.module#FranchiseModule',
  },

  {
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
  },

  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
  },


  // {
  //   path: 'AP',
  //   loadChildren: './AP/ap.module#APModule',
  // },
  // {
  //   path: 'Accounts',
  //   loadChildren: './Accounts/accounts.module#AccountsModule',
  // },
  // {
  //   path: 'Inventory',
  //   loadChildren: './Inventory/invent.module#InventModule',
  // },
  {
    path: '',
    redirectTo: 'iot-dashboard',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
