import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    cuser; menu_access;

    constructor(
        private router: Router
    ) {
        this.cuser = JSON.parse(localStorage.getItem('userinfo'));
    }

    validate(id) {
        if (!(this.menu_access.find(x => x == id))) {
            this.router.navigate(['/pages/404']);
        }
    }
    canActivate() {
        setTimeout(() => {
            // console.log("userinfo1", this.cuser)
            this.cuser = JSON.parse(localStorage.getItem('userinfo'));
            this.menu_access = this.cuser ? JSON.parse(this.cuser['menu_role']) : [];
            var menu = (this.router.url).split('/');
            // console.log("URL", menu)
            if (!this.cuser) {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/auth/logout']);
                // this.router.navigate(['/pages/iot-dashboard']);
                return false;
            }
            // else {
            //     this.router.navigate(['/pages/iot-dashboard']);
            // }

            else {
                switch (menu[3]) {
                    case "Payment":
                        this.validate(91);
                        break;
                    case "Subscriber Status Card":
                        this.validate(92);
                        break;
                    case "ExpiryDetails":
                        this.validate(93);
                        break;
                    case "Customer Status Chart":
                        this.validate(94);
                        break;
                    case "Link Status":
                        this.validate(95);
                        break;
                    case "CAF Pending":
                        this.validate(96);
                        break;
                    case "Agreement Expiry Details":
                        this.validate(97);
                        break;
                    case "Balance Sheet":
                        this.validate(98);
                        break;
                    case "list-adminuser":
                        this.validate(81);
                        break;
                    case "add-adminuser":
                        this.validate(82);
                        break;
                    // case "edit-adminuser":
                    //     this.validate(83);
                    //     break;
                    case "userprofilelist":
                        this.validate(71);
                        break;
                    case "adduserprofile":
                        this.validate(72);
                        break;
                    // case "Edit User Profile":
                    //     this.validate(73);
                    //     break;
                    case "list-business":
                        this.validate(101);
                        break;
                    case "add-business":
                        this.validate(102);
                        break;
                    case "edit-business":
                        this.validate(103);
                        break;
                    case "list-bustaxlog":
                        this.validate(104);
                        break;
                    case "list-group":
                        this.validate(201);
                        break;
                    case "add-group":
                        this.validate(202);
                        break;
                    // case "edit-group":
                    //     this.validate(203);
                    //     break;
                    case "nas-list":
                        this.validate(302);
                        break;
                    case "Add Nas":
                        this.validate(303);
                        break;
                    case "Edit Nas":
                        this.validate(304);
                        break;
                    case "ippoolList":
                        this.validate(306);
                        break;
                    case "addippool":
                        this.validate(307);
                        break;
                    // case "editippool":
                    //     this.validate(308);
                    //     break;
                    case "list-ap":
                        this.validate(310);
                        break;
                    case "add-ap":
                        this.validate(311);
                        break;
                    // case "Edit AP":
                    //     this.validate(312);
                    //     break;
                    case "service-list":
                        this.validate(314);
                        break;
                    case "addservice1":
                        this.validate(315);
                        break;
                    case "edit-service":
                        this.validate(316);
                        break;
                    case "viewservice":
                        this.validate(317);
                        break;
                    case "list-price":
                        this.validate(318);
                        break;
                    case "add-price":
                        this.validate(319);
                        break;
                    case "edit-price":
                        this.validate(320);
                        break;
                    case "resellerList":
                        this.validate(401);
                        break;
                    case "add-reseller":
                        this.validate(402);
                        break;
                    case "edit-reseller":
                        this.validate(403);
                        break;
                    case "viewreseller":
                        this.validate(404);
                        break;
                    case "list-branch":
                        this.validate(501);
                        break;
                    case "add-branch":
                        this.validate(502);
                        break;

                    // case "Edit Branch":
                    //     this.validate(503);
                    //     break;
                    case "custList":
                        this.validate(701);
                        break;
                    case "add-cust":
                        this.validate(702);
                        break;
                    case "edit-cust":
                        this.validate(703);
                        break;
                    case "viewcust":
                        this.validate(704);
                        break;
                    case "Renew Subscriber":
                        this.validate(705);
                        break;
                    case "depositlist":
                        this.validate(801);
                        break;
                    case "adddeposit":
                        this.validate(802);
                        break;
                    // case "Edit Deposit":
                    //     this.validate(803);
                    //     break;
                    case "invoicelist":
                        this.validate(807);
                        break;
                    case "listreceipt":
                        this.validate(804);
                        break;
                    // case "Add Receipt":
                    //     this.validate(805);
                    //     break;
                    // case "Edit Receipt":
                    //     this.validate(806);
                    //     break;
                    case "list-hsn":
                        this.validate(601);
                        break;
                    // case "Add HSN":
                    //     this.validate(602);
                    //     break;
                    // case "Edit HSN":
                    //     this.validate(603);
                    //     break;
                    case "list-make":
                        this.validate(605);
                        break;
                    // case "Add Make":
                    //     this.validate(606);
                    //     break;
                    // case "Edit Make":
                    //     this.validate(607);
                        break;
                    case "list-type":
                        this.validate(609);
                        break;
                    // case "Add type":
                    //     this.validate(610);
                    //     break;
                    // case "Edit Type":
                    //     this.validate(611);
                    //     break;
                    case "list-model":
                        this.validate(613);
                        break;
                    // case "Add Model":
                    //     this.validate(614);
                    //     break;
                    // case "Edit Model":
                    //     this.validate(615);
                    //     break;

                    default:
                        if (menu[2] == 'iot-dashboard') {
                            return true;
                        }else {
                            this.router.navigate(['/auth/logout']);
                        }
                        break;
                }
            }

        }, 1);
        if (!localStorage.getItem('userinfo')) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/auth/logout']);
            return false;
        }
        return true;
    }
}