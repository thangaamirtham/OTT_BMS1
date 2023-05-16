import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JSXLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'list-vod',
  templateUrl: './vodList.component.html',
  styleUrls:['./vodList.component.scss']
})

export class ListvodComponent implements OnInit {
  data; totalpage = 10; pages = [1, 2, 3, 4, 5]; count;
  bus; bus_name; group1;refresh;
  group_name; nas1; nas_name; ippool1; ippool_name; search;
  pager: any = {}; page: number = 1; pagedItems: any = []; limit: number = 25;

  constructor(
    private router: Router,

  ) { }

  async ngOnInit() {
    // localStorage.removeItem('array');

    }
  

}
