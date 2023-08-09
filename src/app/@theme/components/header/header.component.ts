import { Component, Input, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { searchbarcomponent } from '../searchbar/searchbar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { UpdateinfoComponent } from '../updateinfo/updateinfo.component';
import { RoleService } from '../../../pages/_service/index';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  config;
  @Input() position = 'normal';

  user: any = { name: this.role.getFname() }


  userMenu = [{ title: 'Log out', link: '/auth/logout' }, { title: 'Change Password', data: { id: 'Change Password' }, }, { title: 'Update Info', data: { id: 'Update_info' }, }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    public nasmodel: NgbModal,
    private role: RoleService,
  ) {
  }

  ngOnInit() {
     this.menuService.onItemClick().subscribe((event) => {
      console.log('Event', event)
      if (event.item.title === 'Change Password') {
        // this.Add_profile();
        const activeModal = this.nasmodel.open(ChangepasswordComponent, { size: 'sm', container: 'nb-layout' });

        // activeModal.componentInstance.modalHeader = 'Change Password';

      }



    });

    this.updateinfo();

  }


  updateinfo() {

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Update Info') {

        const activeModal = this.nasmodel.open(UpdateinfoComponent, { size: 'sm', container: 'nb-layout' });



      }
    });

  }

  search() {
    const activeModal = this.nasmodel.open(searchbarcomponent, { size: 'sm', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Search';

    activeModal.result.then((data) => {

    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  // passwordchange(){

  // }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  //   Add_profile(){
  //     console.log("inside AddProfile")
  //     const activeModal = this.nasmodel.open(ChangepasswordComponent, { size: 'lg', container: 'nb-layout' });

  //     activeModal.componentInstance.modalHeader = 'Change Password';
  // }
}
