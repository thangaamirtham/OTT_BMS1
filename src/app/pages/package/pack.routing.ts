import { NgModule } from '@angular/core';
import { packComponent } from './pack.component';
import { Routes, RouterModule } from '@angular/router';
import { packListComponent } from './packList/packListComponent';
import { packaddComponent } from './packadd/packadd.component';
// import { EdituserComponent } from './edituser/edituser.component';
// import { ViewuserComponent } from './viewuser/viewuser.component';
import { AuthGuard } from '../_service/guard';
import { PackmapComponent } from './packmap/packmap.component';
import { UpdatepackmapComponent } from './updatepackmap/updatepackmap.component';
import { ListOTTPlanComponent } from './list-ottplan/list-ottplan.component';
import { OTTPlanComponent } from './ott-plan/ott-plan.component';
import { AllowpackComponent } from './allowpack/allowpack.component';

const routes: Routes = [{
  path: '',
  component: packComponent,
  children: [
    { path: 'package-list', component: packListComponent },
    { path: 'add-package', component: packaddComponent },
    { path: 'pack-map', component: PackmapComponent },
    { path: 'update-packmap', component:UpdatepackmapComponent},
    {path: 'list-ott',component: ListOTTPlanComponent},
    {path: 'add-ott',component: OTTPlanComponent},
    {path:'allow-pack', component: AllowpackComponent}

  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userRoutingModule { }

export const routedComponents = [
  packComponent,
  packListComponent,
  packaddComponent,
  PackmapComponent,
  UpdatepackmapComponent,
  ListOTTPlanComponent,
  OTTPlanComponent,
  AllowpackComponent
  // ViewuserComponent,
];