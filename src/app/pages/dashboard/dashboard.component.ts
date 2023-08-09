import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { DashboardService, RoleService, PagerService } from '../_service'
// import { RenewCustComponent } from '../customer/RenewCustomer/renewCust.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { DatePipe } from '@angular/common';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { TopupComponent } from './topup/topup.component'


interface CardSettings {
   title: string;
   iconClass: string;
   type: string;
   value: any;
   status: any;
}

@Component({
   selector: 'ngx-dashboard',
   styleUrls: ['./dashboard.component.scss'],
   templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnDestroy {
   alive = true;daytype:any;
   lival: any;
   // live=null;
   value1 = 100;
   now: any = new Date();
   tmr: string;
   yesterday: string;
   dayafter: string;
   tot1; tot2; tot3; tot4;
   //   limit=10;
   page: number = 1;
   yester: any = []; yest; pageryest: any = []; pagedItemsyest: any = []; pageyest: number = 1;
   today: any = []; tod; pagertod: any = []; pagedItemtoday: any = []; pagetom: number = 1;
   tmrw: any = []; tom; pagertom: any = []; pagedItemtom: any = []; pageytmr: number = 1;
   dateaftertomr: any = []; dat; pagerdayafttmr: any = []; pagedItemdft: any = []; pagedataftertmr: number = 1;
   pager: any = {}; pagedItems: any = []; cu_dep; pre_dep;
   payment: any[]; payamt: any[]; cafpending; ocbaldata; ocbalcount; pagedocbalItems: any = []; cafcount; acctype;
   expiry_status; online_status; ipmodecpe;
   aggrdetails: any;
   data; serid; datasplitinfo;
   _someService: any;
   valueObj: any;
   pagedcafItems: any = [];
   limit: number = 10; Opage: number = 1; Opager: any = {};
   Climit: number = 10; Cpage: number = 1; Cpager: any = {};

   public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes; servtype; custname;
   public primaryColour = '#dd0031';
   public secondaryColour = '#006ddd';
   public loading = false;

   constructor(
      private themeService: NbThemeService,
      private solarService: SolarData,
      public role: RoleService,
      public dash: DashboardService,
      public activeModal: NgbModal,
      private router: Router,
      private nasmodel: NgbModal,
      private pageservice: PagerService,
      private datePipe: DatePipe
   ) {
      // console.log('Router URL', router.url)
      this.themeService.getJsTheme()
         .pipe(takeWhile(() => this.alive))
         .subscribe(theme => {
            this.statusCards = this.statusCardsByThemes[theme.name];
         });

      this.solarService.getSolarData()
         .pipe(takeWhile(() => this.alive))
         .subscribe((data) => {
            this.solarValue = data;
         });
      // console.log(this.solarValue);
      // this.totalcount =  this.dash.getcount({});
      // console.log(result)
      // console.log(this.totalcount);

      // console.log("hiii", this.totalcount)
      // this.statusCards[0].value = this.totalcount.total;
      // this.statusCards[1].value = this.totalcount.online_status;
      // this.statusCards[2].value = this.totalcount.active_status;
      // this.statusCards[3].value = this.totalcount.expiry_status;
      // this.statusCards[4].value = this.totalcount.postpaid_act_user;
      // this.statusCards[5].value = this.totalcount.disabled_user;
      // console.log(this.statusCards)

      //  this.dash.getcount({}).subscribe ( result =>{
      //     // console.log(result)
      //     this.totalcount = result  ;
      //      // this.getlist();

      // });
      this.tmr = formatDate(this.now.getTime() + 24 * 60 * 60 * 1000, 'dd-MM-yyyy', 'en-US', '+0530');
      this.yesterday = formatDate(this.now.getTime() - 24 * 60 * 60 * 1000, 'dd-MM-yyyy', 'en-US', '+0530');
      //  this.daybefore = formatDate(this.now.getTime() - 48 * 60 * 60 * 1000, 'dd-MM-yyyy', 'en-US', '+0530');
      this.dayafter = formatDate(this.now.getTime() + 48 * 60 * 60 * 1000, 'dd-MM', 'en-US', '+0530');
      this.now = formatDate(this.now.getTime(), 'dd-MM-yyyy', 'en-US', '+0530');
   }
   // console.log(this.count)



   async ngOnInit() {
      // this.yesDetails();
      if (this.role.getroleid() > 111) {
         this.totalcount = await this.dash.getcount({});
         if (this.totalcount) {
            this.statusCards[0].value = this.totalcount.total;
            // this.statusCards[1].value = this.totalcount.online_status;
            this.statusCards[1].value = this.totalcount.active_status;
            this.statusCards[2].value = this.totalcount.expiry_status;
         }
         // await this.getdeposit();
         await this.getExpiryDetails(0, 1, true);
         await this.getExpiryDetails(1, 1, true);
         await this.getExpiryDetails(2, 1, true);
         await this.getExpiryDetails(3, 1, true);
         // await this.getPayment();
         await this.getAggExpDet();
         await this.getcount();
         // await this.getAmount();
         await this.getcafpending();
      }

      if (this.role.getroleid() == 111) {
         await this.view();
         // await this.splitdata();
      }
   }

   recharge(item) {
      const activeModal = this.activeModal.open(TopupComponent, { size: 'sm', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Top UP';
      activeModal.componentInstance.item = { subs_flag: item };
      activeModal.result.then((data) => {
      });
   }

   async view() {
        }

   async splitdata() {
     
   }

   bytefunc(datam) {
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(datam) / Math.log(k));
      return (parseFloat((datam / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i])
   }

   bytefunct(datam) {
      const k = 1024;
      const sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(datam) / Math.log(k));
      return (parseFloat((datam / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i])
   }


   setPage() {
      // console.log(this.data);
      this.Opager = this.pageservice.getPager(this.ocbalcount, this.Opage, this.limit);
      this.pagedocbalItems = this.ocbaldata;
   }

   async getcafpending() {
      let result = await this.dash.getCAFPending({
         index: (this.Cpage - 1) * this.Climit,
         limit: this.Climit,
      });
      if (result) {
         this.cafpending = result;
         this.cafcount = this.cafpending.length;
         this.setcafPage();
      }

   }

   async cafexport() {
      let res = await this.dash.getCAFPending({
      });
      if (res) {
         let tempdata = [], temp: any = res[0];
         for (var i = 0; i < temp.length; i++) {
            let param = {};
            param['RESELLER TYPE'] = temp[i]['role'] == 444 ? 'Bulk Resellre' : temp[i]['role'] == 333 ? 'Deposit Reseller' : temp[i]['role'] == 666 ? 'Sub ISP Bulk' :
               temp[i]['role'] == 555 ? 'Sub ISP Deposit' : temp[i]['role'] == 551 ? 'Sub Distributor Deposit' : temp[i]['role'] == 661 ? 'Sun Distributor Bulk' : 'Hotel';
            param['RESELLER NAME'] = temp[i]['reseller_name'];
            param['BUSINESS NAME'] = temp[i]['company']
            param['MOBILE'] = temp[i]['mobile'];
            param['COUNT'] = temp[i]['caf_count'];
            tempdata[i] = param
         }
         const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
         const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
         JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
         JSXLSX.writeFile(wb, 'CAF Pending List' + EXCEL_EXTENSION);
      }
   }

   async getdeposit() {
      let result = await this.dash.getDeposit({});
      this.cu_dep = result[0];
      this.pre_dep = result[1];
      // console.log("depositres",result);

   }

   getcaflist(page) {
      var total = Math.ceil(this.cafcount / this.Climit);
      let result = this.pageservice.pageValidator(this.Cpage, page, total);
      this.Cpage = result['value'];
      if (result['result']) {
      }
   }

   setcafPage() {
      // console.log(this.data);
      this.Cpager = this.pageservice.getPager(this.cafcount, this.Cpage, this.Climit);
      this.pagedcafItems = this.cafpending;
   }

   async getAmount() {
      let result = await this.dash.payment({})
      // console.log("pay",result)
      this.payamt = result[0]
      // console.log("payamt",this.payamt.cmamt)
   }

   async getPayment() {
      let result = await this.dash.getBalance({})
      // console.log(result['balance']);
      this.payment = result['balance']
   }

   async getAggExpDet() {
      let result = await this.dash.getAggExp({ index: (this.page - 1) * 10, limit: 10 })
      // console.log(result)
      this.aggrdetails = result[0];

   }

   async agrmntexport() {
      let res = await this.dash.getAggExp({
      });
      if (res) {
         let tempdata = [], temp: any = res[0];
         for (var i = 0; i < temp.length; i++) {
            let param = {};
            if (this.role.getroleid() > 777) {
               param['ISP NAME'] = temp[i]['busname'];
            }
            if (this.role.getroleid() >= 775) {
               param['CIRCLE'] = temp[i]['groupname'];
            }
            param['RESELLER TYPE'] = temp[i]['role'] == 444 ? 'Bulk Resellre' : temp[i]['role'] == 333 ? 'Deposit Reseller' : temp[i]['role'] == 666 ? 'Sub ISP Bulk' :
               temp[i]['role'] == 555 ? 'Sub ISP Deposit' : temp[i]['role'] == 551 ? 'Sub Distributor Deposit' : temp[i]['role'] == 661 ? 'Sun Distributor Bulk' : 'Hotel';
            param['RESELLER NAME'] = temp[i]['reseller_name'];
            param['BUSINESS NAME'] = temp[i]['company']
            param['ADDRESS'] = temp[i]['address'];
            param['MOBILE'] = temp[i]['mobile'];
            temp[i]['st_date'] = this.datePipe.transform(temp[i]['start_date'], 'd MMM y hh:mm:ss a')
            param['START DATE'] = temp[i]['st_date'];
            temp[i]['en_date'] = this.datePipe.transform(temp[i]['end_date'], 'd MMM y hh:mm:ss a')
            param['END DATE'] = temp[i]['en_date'];
            tempdata[i] = param
         }
         const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
         const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
         JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
         JSXLSX.writeFile(wb, 'Aggrement Expiry List' + EXCEL_EXTENSION);
      }
   }


   async getcount() {
      let result = await this.dash.getcount({})
      // console.log(result)
      this.totalcount = result;
      await this.getlist();
      // console.log("hiii", this.totalcount)
   }

   async getlist() {
      // console.log(this.totalcount)
      this.lival = this.totalcount
      // console.log(this.lival)
      return this.lival
   }

   view_user(item) {
      localStorage.setItem('userid', JSON.stringify(item));
      this.router.navigate(['/pages/user/view-user']);
   }

   // renew_user(cust_id, role, cdate, edate) {
   //    const activeModal = this.nasmodel.open(RenewCustComponent, { size: 'lg', container: 'nb-layout' });
   //    activeModal.componentInstance.modalHeader = 'Renew Customer';
   //    activeModal.componentInstance.item = { cust_id: cust_id, role: role, cdate: cdate, edate: edate }
   //    activeModal.result.then((data) => {
   //       this.getExpiryDetails(0, 1, true);
   //       this.getExpiryDetails(1, 1, true);
   //       this.getExpiryDetails(2, 1, true);
   //       this.getExpiryDetails(3, 1, true);
   //    })
   // }

   getExpiryDetails(type, page = 1, dir = false) {
      // console.log("inside Expiry Details");
      let res = '', day = '', pager = '', pagedItems = '', pages = '', limit = '', method = '', count = '';
      switch (type) {
         case 0:
            day = 'yester';
            res = 'yest';
            pager = 'pageryest';
            pagedItems = 'pagedItemsyest';
            pages = 'pageyest';
            method = 'getYexp';
            count = 'tot1';

            // code...
            break;
         case 1:
            day = 'today';
            res = 'tod';
            pager = 'pagertod';
            pagedItems = 'pagedItemtoday';
            pages = 'pagetom';
            method = 'getTodayexp';
            count = 'tot2';
            // code...
            break;
         case 2:
            day = 'tmrw';
            res = 'tom';
            pager = 'pagertom';
            pagedItems = 'pagedItemtom';
            pages = 'pageytmr';
            method = 'getTomorrowExp';
            count = 'tot3';
            // code...
            break;
         case 3:
            day = 'dateaftertomr';
            res = 'dat';
            pager = 'pagerdayafttmr';
            pagedItems = 'pagedItemdft';
            pages = 'pagedataftertmr';
            method = 'getDFT';
            count = 'tot4';
            // code...
            break;
         default:
            // code...
            break;
      }
      dir ? this.initiallist({ day: day, res: res, pager: pager, pagedItems: pagedItems, page: pages, method: method, count: count }) :
         this.list(page, { day: day, res: res, pager: pager, pagedItems: pagedItems, page: pages, method: method });
   }

   async list(page, dayKey) {
      // console.log("list");
      var total = Math.ceil(this[dayKey.res][1]['count'] / 10);
      let result = this.pageservice.pageValidator(this[dayKey.page], page, total);
      this[dayKey.page] = result['value'];
      if (result['result']) {
         await this.initiallist(dayKey);
      }
   }

   async initiallist(dayKey) {
      // console.log("initial list")
      let result = await this.dash[dayKey.method]({ index: (this[dayKey.page] - 1) * 10, limit: 10 })
      if (result) {
         // console.log("result:", result)
         this[dayKey.res] = result;
         this[dayKey.count] = result[1]['count']
      }
      this[dayKey.pager] = this.pageservice.getPager(this[dayKey.res][1]['count'], this[dayKey.page], 10);
      // console.log(dayKey.pager,this[dayKey.pager])
      this[dayKey.pagedItems] = this[dayKey.res][0];
   }


   solarValue: number;
   totalcount: any;
   lightCard: CardSettings = {
      title: 'Total Customers',
      iconClass: 'fas fa-users',
      type: 'primary',
      value: 0,
      status: 1
   };
   // rollerShadesCard: CardSettings = {
   //    title: 'Online Customers',
   //    iconClass: 'fas fa-user',
   //    type: 'success',
   //    value: 0,
   //    status: 2,
   // };
   wirelessAudioCard: CardSettings = {
      title: ' Active Customers',
      iconClass: 'fas fa-user-check',
      type: 'info',
      value: 0,
      status: 2
   };
   coffeeMakerCard: CardSettings = {
      title: ' Expired Customers',
      iconClass: 'fas fa-user-times',
      type: 'danger',
      value: 0,
      status: 3,
   };

   // coffeeMakerCard1: CardSettings = {
   //    title: 'Holded Customers',
   //    iconClass: 'fas fa-user-lock',
   //    type: 'warning',
   //    value: 0,
   //    status: 5
   // };
   // coffeeMakerCard2: CardSettings = {
   //    title: 'Suspended Customers',
   //    iconClass: 'fas fa-user-alt-slash',
   //    type: 'secondary',
   //    value: 0,
   //    status: 6
   // };
   // coffeeMakerCard3: CardSettings = {
   //     title: 'Suspended Customers',
   //     iconClass: 'fas fa-user-alt-slash',
   //     type: 'warning',
   //     value: 0
   // };

   // coffeeMakerCard4: CardSettings = {
   //     title: 'Suspended Customers',
   //     iconClass: 'fas fa-user-alt-slash',
   //     type: 'warning',
   //     value: 0
   // };

   statusCards: any;

   commonStatusCardsSet: CardSettings[] = [
      this.lightCard,
      // this.rollerShadesCard,
      this.wirelessAudioCard,
      this.coffeeMakerCard,
      // this.coffeeMakerCard1,
      // this.coffeeMakerCard2,
      // this.coffeeMakerCard3,
      // this.coffeeMakerCard4,

   ];

   statusCardsByThemes: {
      default: CardSettings[];
      cosmic: CardSettings[];
      corporate: CardSettings[];
      value1: CardSettings[];
   } = {
         default: this.commonStatusCardsSet,
         cosmic: this.commonStatusCardsSet,
         corporate: this.commonStatusCardsSet,
         // {
         //     ...this.lightCard,
         //     type: 'warning',

         // },
         // {
         //     ...this.rollerShadesCard,
         //     type: 'primary',
         // },
         // {
         //     ...this.wirelessAudioCard,
         //     type: 'danger',
         // },
         // {
         //     ...this.coffeeMakerCard,
         //     type: 'secondary',
         // },
         // {
         //     ...this.coffeeMakerCard1,
         //     type: 'secondary',
         // },
         // {
         //     ...this.coffeeMakerCard2,
         //     type: 'secondary',
         // },


         value1: this.commonStatusCardsSet,
      };

   listsubs(event) {
      localStorage.setItem('dash_status', JSON.stringify(event));
      this.router.navigate(['/pages/user/list-user'])
   }

   dayexpiryDetails($event) {
      switch ($event.tabTitle) {
         case 'Yesterday':
            this.daytype = 0;
            break;
         case 'Today':
            this.daytype = 1;
            break;
         case 'Tomorrow':
            this.daytype = 2;
            break;
         default:
            this.daytype = 3;
            break;
      }
   }

   ngOnDestroy() {
      this.alive = false;
   }

}