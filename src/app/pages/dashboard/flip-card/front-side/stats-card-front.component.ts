import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../../../@core/data/solar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DashboardService } from '../../../_service/dashboardservice';
import { RoleService } from '../../../_service/roleservice';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { TopupComponent } from '../../topup/topup.component'

// interface CardSettings {
//     title: string;
//     iconClass: string;
//     type: string;
//     value:any;
//   }


@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent {
  balance;
  // private alive = true;
  //   count: number;
  //    load :any= 'null';
  //    w: number;

  constructor(

    // private themeService: NbThemeService,
    //  private solarService: SolarData,
    //  private router: Router,
    //  public role : RoleService,
    public dash: DashboardService,
    public activeModal: NgbModal,
    public role: RoleService,
  ) {



    //     this.themeService.getJsTheme()
    //     .pipe(takeWhile(() => this.alive))
    //     .subscribe(theme => {

    //     this.statusCards = this.statusCardsByThemes[theme.name];

    //    });
    //      console.log(this.statusCards)

    //   this.solarService.getSolarData()
    //  .pipe(takeWhile(() => this.alive))
    // .subscribe((data) => {
    //  this.solarValue = data;
    //   });

    //  this.dash.getcount({}).subscribe ( result =>{

    //       console.log(result)
    //       this.count=10;
    //       console.log(this.count)



    //      });
    //  this.w=11;

  }

  recharge(item) {
    const activeModal = this.activeModal.open(TopupComponent, { size: 'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Top UP';
    activeModal.componentInstance.item = {res_flag:item};
    activeModal.result.then((data) => {
    });
  }

  async getBalance() {
    // if (this.role.getroleid() < 665 && this.role.getroleid() >= 332) {
      let result = await this.dash.getBalance({})
      this.balance = result['balance']
    // }
  }

  async ngOnInit() {
    await this.getBalance();
  }


  // solarValue: number;
  // lightCard: CardSettings = {
  //   title: 'Total Customers',
  //   iconClass: 'fas fa-users',
  //   type: 'primary',
  //   value: this.count,

  // };
  // rollerShadesCard: CardSettings = {
  //   title: 'Online Customers',
  //   iconClass: 'fas fa-user',
  //   type: 'success',
  //   value:  this.w
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
  // coffeeMakerCard3: CardSettings = {
  //   title: 'Suspended Customers',
  //   iconClass: 'fas fa-user-alt-slash',
  //   type: 'warning',
  //   value: 10
  // };
  // coffeeMakerCard4: CardSettings = {
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
  //   this.coffeeMakerCard3,
  //   this.coffeeMakerCard4,

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
  //     {
  //       ...this.coffeeMakerCard3,
  //       type: 'secondary',
  //     },
  //     {
  //       ...this.coffeeMakerCard4,
  //       type: 'secondary',
  //     },

  //   ],
  // };
}