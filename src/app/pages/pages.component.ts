import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddNasComponent } from './language&genre/Add-language&genre/add-language&genre.component';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
<div class="new">
   <ngx-sample-layout>
      <nb-menu autoCollapse="true" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
   </ngx-sample-layout>
</div>
`,
})
export class PagesComponent {
  role = []; roleid;
  constructor(
    private nasmodel: NgbModal
  ) {
    // this.role = JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['menu_role']);
    this.roleid = JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['role']);
    this.menu = [{
      title: 'Dashboard',
      icon: 'fa fa-home',
      link: '/pages/iot-dashboard',
      home: true,
    },


    {
      title: 'Package',
      // icon: 'fa fa-box',
      icon: 'fa fa-box',
      children: [

        {
          title: 'PackMap',
          link: '/pages/package/pack-map',
          hidden: this.roleid <= 777,
        },
        {
          title: 'UpdatePackMap',
          link: '/pages/package/update-packmap',
          hidden: this.roleid <= 777,
        },
        {
          title: 'AllowPackages',
          link: '/pages/package/allow-pack',

        },
      ],
    },

    {
      title: 'OTT',
      icon: 'fa fa-film',
      hidden: this.roleid <= 777,
      children: [
        {
          title: 'List',
          link: '/pages/package/list-ott'
        },
        {
          title: 'Add',
          link: '/pages/package/add-ott'
        },
      ]
    },



    {
      title: 'Franchise',
      icon: 'fa fa-user-secret',
      hidden: this.roleid <= 777,
      children: [
        {
          title: 'List',
          link: '/pages/manager/listmanager',
        },

        {
          title: 'Add',
          link: '/pages/manager/addmanager',
        },
      ],
    },
    {
      title: 'Users',
      icon: 'fa fa-users',
      // hidden: this.roleid <= 777,
      children: [
        {
          title: 'List User',
          link: '/pages/user/list-user',
        },
        {
          title: 'Add User',
          link: '/pages/user/add-user',
        },
      ]
    },

    {
      title: 'Live Channel',
      icon: 'fa fa-signal',
      hidden: this.roleid <= 777,
      children: [

        {
          title: 'Language ',
          link: '/pages/channel/list-lang',
        },

        {
          title: 'Genre ',
          link: '/pages/channel/list-genre',
        },
        {
          title: 'List',
          link: '/pages/channel/list-channel',
        },
        {
          title: 'Add',
          link: '/pages/channel/add-channel',
        },
        // {
        //   title:'Circle',
        //   link: '/pages/channel/list-circle',
        // },
      ],
    },

    {
      title: 'Accounts',
      icon: 'fa fa-money-check-alt',
      // hidden: this.roleid <= 777,
      children: [
        {
          title: 'Invoice',
          link: '/pages/account/invoice',
        },
        {
          title: 'Deposit',
          // icon: 'fa fa-wallet',

          children: [
            {
              title: 'List ',
              link: '/pages/account/listdeposit',
            },

            {
              title: 'Add ',
              link: '/pages/account/deposit',
              hidden: this.roleid <= 777
            },
          ]
        }, {
          title: 'Online Payment',
          link: '/pages/account/online-pay'
        }
        // {
        //   title:'Status',
        //   link: '/pages/account/trn-status'
        // }
      ]
    },













      // {
      //   title: 'Streaming',
      //   icon: 'fa fa-desktop',
      //   hidden: this.roleid <= 777,
      //   link: '/pages/streaming/live-streaming',
      // },
      // {
      //   title: 'VOD',
      //   icon: 'fa fa-video',
      //   hidden: this.roleid <= 777,
      //   children: [
      //     {
      //       title: 'List',
      //       link: '/pages/vod/vodList',
      //     },
      //     {
      //       title: 'Add',
      //       link: '/pages/vod/addvod',
      //     },
      //   ],
      // },
    ]
  }

  menu: NbMenuItem[]
}