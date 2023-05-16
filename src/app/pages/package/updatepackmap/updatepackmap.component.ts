import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ngx-smart-table';
import { AddSuccessComponent } from './../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackService, businesservice } from '../../_service/index';

@Component({
  selector: 'ngx-updatepackmap',
  templateUrl: './updatepackmap.component.html',
  styleUrls: ['./updatepackmap.component.scss']
})
export class UpdatepackmapComponent implements OnInit {
  UpdatePackForm; selectedRows
  submit: boolean = false;
  config; settings;
  plandata;
  o_type = []; tax_type = []; o_status = []; day_type = []; gltv_id: [];
  vendor = [];
  source: LocalDataSource = new LocalDataSource(); resel;
  constructor(
    public activeModal: NgbModal,
    private router: Router,
    private alert: ToasterService,
    private pack: PackService,
    private bus: businesservice,

  ) {

    this.o_type = [
      { value: '1', title: 'GLTV' },
      { value: '2', title: 'GLTV&OTT' }
    ],
      this.tax_type = [
        { value: '0', title: 'Inclusive' },
        { value: '1', title: 'Exclusive' }
      ],
      this.o_status = [
        { value: '1', title: 'Enable' },
        { value: '2', title: 'Disable' }
      ],
      this.day_type = [
        { value: '1', title: 'Days' },
        { value: '2', title: 'Months' }
      ],
      this.vendor = [
        { value: '1', title: 'M2MIT' },
        { value: '2', title: 'PLAYBOX' }
      ]


    this.settings = {

      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark" (click)="editConfirm($event)"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: false,
        edit: true,
        delete: false
      },
      selectMode: 'multi',

      columns: {
        // id: {
        //   title: 'ID',
        //   type: 'number',
        // },
        otttype: {
          title: 'Validity',
          editable: false,
          valuePrepareFunction: (otttype: any) => {
            return (otttype == 2 ? 'GLTV&OTT' : 'GLTV');
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.o_type,
            },
          },
          filter: true,
        },
        packname: {
          title: 'GltvPlan',
          type: 'String',
          editable: false,
        },
        gltvpackamt: {
          title: 'GLTVPrice',
          type: 'number',
        },
        ottplan_name: {
          title: 'OTTPlan',
          type: 'String',
          editable: false,
        },
        ottplancode: {
          title: 'PlanCode',
          type: 'String',
          editable: false,
        },
        ottpamt: {
          title: 'OTTPrice',
          type: 'number',
        },
        taxtype: {
          title: 'Tax',
          editable: false,
          valuePrepareFunction: (taxtype: any) => {
            return (taxtype == 1 ? 'Excluding Tax' : 'Including Tax');
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.tax_type
            },
          },
          filter: true,
        },
        gltvdays: {
          title: 'Time Unit',
          type: 'number',
        },
        gltvdaytype: {
          title: 'Type',
          valuePrepareFunction: (gltvdaytype: any) => {
            return (gltvdaytype == 1 ? 'Days' : 'Months');
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.day_type,
            },
          },
          filter: true,
        },
        apstatus: {
          title: 'Status',
          valuePrepareFunction: (apstatus: any) => {
            return (apstatus == 2 ? 'Disable' : 'Enable');
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.o_status,
            },
          },
          filter: true,
        },
        ott_vendor: {
          title: 'Vendor',
          valuePrepareFunction: (ott_vendor: any) => {
            return (ott_vendor == 1 ? 'M2MIT' : 'PLAYBOX');
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.vendor,
            },
          },
          filter: true,
        },
      },
    };
  }


  async ngOnInit() {
    await this.createForm();
    await this.packMap(); await this.showReseller();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }

  async editConfirm(event) {
    event.confirm.resolve(event.newData);
  };

  async packMap() {
    if (this.UpdatePackForm.value['manid']) {
      this.plandata = await this.pack.listPackMap({ manid: this.UpdatePackForm.value['manid'] })
      this.source.load(this.plandata)
    }
  }
  async showReseller($event = '') {
    console.log('Initial Load---')
    this.resel = await this.bus.showdistributor({ type: 4 })
    // console.log('Reseller-----', this.resel)
  }

  async updatePack() {
    if (this.UpdatePackForm.invalid) {
      this.submit = true;
      return;
    }
    console.log('SelectedRows', this.selectedRows);

    this.UpdatePackForm.value['plan'] = this.selectedRows
    let planmap = [this.UpdatePackForm.value]
    console.log('PlanData', planmap)

    let result = await this.pack.updatepackMap({ map: planmap });
    if (result) {
      this.result_pop(result);
      this.source.reset()
    }
    // console.log('res',result);
    // const toast: Toast = {
    //   type: result[0]['error_msg'] == 0 ? 'success' : 'warning',
    //   title: result[0]['error_msg'] == 0 ? 'Success' : 'Failure',
    //   body: result[0]['msg'],
    //   timeout: 5000,
    //   showCloseButton: true,
    //   bodyOutputType: BodyOutputType.TrustedHtml,
    // };
    // this.alert.popAsync(toast);
    // if (result[0]['error_msg'] == 0) {
    // this.router.navigate(['/pages/service/service-list'])
    // }
  }









  result_pop(item) {
    // Object.assign(item, { plan: "1" });
    const activeModal = this.activeModal.open(AddSuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Result';
    activeModal.componentInstance.item = item;
    activeModal.result.then((data) => {

    });
  }


  createForm() {
    this.UpdatePackForm = new FormGroup({
      manid: new FormControl('', Validators.required),
    });
  }

}
