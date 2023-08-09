import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import{StreamingRoutingModule,routedComponents} from './streaming.routing';
import { ToasterModule } from 'angular2-toaster';
import { AddSuccessComponent } from './success/add-success.component';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    StreamingRoutingModule,
     AutoCompleteNModule
  
  ],
  declarations: [
  ...routedComponents,
  AddSuccessComponent
  
     
  ],
  entryComponents : [AddSuccessComponent
   
  ],
  providers: []
})
export class StreamingModule { }