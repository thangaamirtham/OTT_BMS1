import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../../../@core/data/solar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopupComponent } from '../../topup/topup.component'
import { RoleService } from '../../../_service';
// interface CardSettings {
//   title: string;
//   iconClass: string;
//   type: string;
//   value:any;
// }

@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent {
  // private alive = true;
  
  constructor(
    // private themeService: NbThemeService,
    //  private solarService: SolarData,
    //  private router: Router,
    public activeModal: NgbModal,
    public role: RoleService,

  ) {
    //     this.themeService.getJsTheme()
    //     .pipe(takeWhile(() => this.alive))
    //     .subscribe(theme => {
    //     this.statusCards = this.statusCardsByThemes[theme.name];
    //    });

    //   this.solarService.getSolarData()
    //  .pipe(takeWhile(() => this.alive))
    // .subscribe((data) => {
    //  this.solarValue = data;
    // });
  }
  

  

  // solarValue: number;
  // lightCard: CardSettings = {
  //   title: 'Total Customers',
  //   iconClass: 'fas fa-users',
  //   type: 'primary',
  //   value: 10

  // };
  // rollerShadesCard: CardSettings = {
  //   title: 'Online Customers',
  //   iconClass: 'fas fa-user',
  //   type: 'success',
  //   value: 10
  // };
  // wirelessAudioCard: CardSettings = {
  //   title: 'Active Customers',
  //   iconClass: 'fas fa-user-check',
  //   type: 'info',
  //   value: 10
  // };
  // coffeeMakerCard: CardSettings = {
  //   title: 'Expired Customers',
  //   iconClass: 'fas fa-user-times',
  //   type: 'danger',
  //   value: 10
  // };
  // coffeeMakerCard1: CardSettings = {
  //   title: 'Holded Customers',
  //   iconClass: 'fas fa-user-clock',
  //   type: 'warning',
  //   value: 10
  // };
  // coffeeMakerCard2: CardSettings = {
  //   title: 'Suspended Customers',
  //   iconClass: 'fas fa-user-alt-slash',
  //   type: 'warning',
  //   value: 10
  // };


  // statusCards: string;

  // commonStatusCardsSet: CardSettings[] = [
  //   this.lightCard,
  //   this.rollerShadesCard,
  //   this.wirelessAudioCard,
  //   this.coffeeMakerCard,
  //   this.coffeeMakerCard1,
  //   this.coffeeMakerCard2,

  // ];

  // statusCardsByThemes: {
  //   default: CardSettings[];
  //   cosmic: CardSettings[];
  //   corporate: CardSettings[];
  // } = {
  //   default: this.commonStatusCardsSet,
  //   cosmic: this.commonStatusCardsSet,
  //   corporate: [
  //     {
  //       ...this.lightCard,
  //       type: 'warning',
  //     },
  //     {
  //       ...this.rollerShadesCard,
  //       type: 'primary',
  //     },
  //     {
  //       ...this.wirelessAudioCard,
  //       type: 'danger',
  //     },
  //     {
  //       ...this.coffeeMakerCard,
  //       type: 'secondary',
  //     },
  //     {
  //       ...this.coffeeMakerCard1,
  //       type: 'secondary',
  //     },
  //     {
  //       ...this.coffeeMakerCard2,
  //       type: 'secondary',
  //     },

  //   ],
  // };

}
