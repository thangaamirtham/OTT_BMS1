import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { channelRoutingModule, routedComponents, entryComponents } from './channel.routing';
import { ToasterModule } from 'angular2-toaster';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { channelservices ,circleservices, generservices, languageservices } from '../_service/index';


@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    channelRoutingModule,
    AutoCompleteNModule,
    
    // ShareModule
  ],
  declarations: [
    routedComponents
  ],
  entryComponents: [
    ...entryComponents
    
  ],
  providers: [NgbActiveModal, channelservices ,circleservices,generservices,languageservices]
})
export class channelModule { }