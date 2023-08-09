import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddSuccessComponent } from '../success/add-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import * as JSXLSX from 'xlsx';
import { channelservices, PackService } from '../../_service/index';
import { ITreeOptions } from 'angular-tree-component';
import { toJS } from "mobx";


@Component({
  selector: 'packadd',
  templateUrl: './packadd.component.html',
  styleUrls: ['./packaddstyle.scss'],
})

export class packaddComponent implements OnInit, AfterViewInit {
  @ViewChild('multiSelect') multiSelect; file: any;
  @ViewChild('tree') public tree;

  public loadContent: boolean = false; tab: boolean = false;
  submit: boolean = false; AddPackageForm; resell; alnas: any = []; nasresel: any = []; busname;
  datas; settings; nassettings; grup; searchnas: string; busresel: any = []; nas; reseldata;
  buresellitems; config; falback; arrayBuffer: any; bulk: any = []; data: any;
  nodes = []; getChannel; item; editdatas;

  options: ITreeOptions = {
    useCheckbox: true
  };

  constructor(
    private alert: ToasterService,
    private router: Router,
    private _fb: FormBuilder,
    // private select: SelectService,
    public activeModal: NgbModal,
    public channel: channelservices,
    public pack: PackService

  ) {
    this.item = JSON.parse(localStorage.getItem('array'))
  }




  async ngOnInit() {
    this.createForm();
  }

  async ngAfterViewInit() {
    await this.getchannel(),
    this.edit();
  }

  cancel() {
    this.router.navigate(['/pages/package/package-list']);
  }

  async addService() {
    // this.submit = true;
    // // console.log(this.AddPackageForm.value)
    // if (this.AddPackageForm.invalid) {
    //   return;
    // }
    const nodeselected = this.selectednodes();
    let method = 'addpack'
    if (this.item) {
      console.log(this.item)
      method = 'editpack'
      this.AddPackageForm.value['pack_id'] = this.editdatas['pack_id']
    }
    console.log('Selcted Node', nodeselected)
    this.AddPackageForm.value['channel_id'] = nodeselected.toString();
    console.log(this.AddPackageForm.value['channel_id'])

    let result = await this.pack[method](this.AddPackageForm.value)
    console.log(result)
    // this.toastalert(result[0]['Error_msg'], result[0]['msg'])
    // if (!result[0]['Error_msg']) {
    //   this.router.navigate(['/pages/package/packagelist'])
    // }

  }

  // toastalert(status, msg) {
  //   const toast: Toast = {
  //     type: !status ? 'success' : 'warning',
  //     title: !status ? 'Success' : 'Failure',
  //     body: msg,
  //     timeout: 5000,
  //     showCloseButton: true,
  //     bodyOutputType: BodyOutputType.TrustedHtml,
  //   };
  //   this.alert.popAsync(toast);

  // }








  async getchannel() {
    console.log('Inside get channel')
    let resp = await this.channel.listchannels({})
    let result = resp['data'];
    // console.log('Get Channel--------------', result)

    if (result) {
      this.getChannel = result;

      let temp = [], temp1 = [];
      let total = result['length'];
      // console.log(total, result)
      for (var i = 0; i < total; i++) {
        let lang = result[i]['language_name'];
        let genre, channel = [];
        for (var j = i; j < total; j++) {
          if (lang == result[j]['language_name']) {
            genre = result[j]['genre_name']

            for (var k = j; k < total; k++) {
              if (k == total - 1) {
                // console.log('Temp_val', JSON.stringify(channel))
                temp.push({ name: genre, children: channel });
                j = k;
                i = k;
              }
              if (result[k]['genre_name'] == genre && lang == result[k]['language_name']) {
                channel.push({ name: result[k]['channel_name'], id: result[k]['channel_id'] })
              } else {
                i = k - 1;
                j = k - 1;
                // console.log('Temp_val', JSON.stringify(channel))
                temp.push({ name: genre, children: channel });
                channel = [];
                break;
              }

            }
          } else {
            i = j - 1;
            break;
          }

        }
        temp1.push({
          name: lang,
          children: temp
        });
        temp = []
      }

      this.nodes = temp1
      console.log('nodes',this.nodes)
      const nodeselected = this.selectednodes();

      for (var i = 0; i < nodeselected.length; ++i) {
        this.tree.treeModel.getNodeById(nodeselected[i]).setIsSelected(false);
      }
      console.log('node', this.nodes,nodeselected)

      setTimeout(() => {

        this.selectnodes();

      }, 1000);

    }
  }

  selectnodes() {

    let channel = this.editdatas['channel_id'];
    for (var i = 0; i < channel.length; ++i) {
      let leaf = this.tree.treeModel.getNodeById(channel[i])
      if (leaf) {
        leaf.setIsSelected(true);
      }
    }

  }


  selectednodes() {
    const selectedNodes = [];
    Object.entries(toJS(this.tree.treeModel.selectedLeafNodeIds)).forEach(([key, value]) => {
      console.log(key, value);
      console.log('tree', this.nodes)
      if (value === true) {
        selectedNodes.push(parseInt(key));
      }
    });
    return (selectedNodes);
  }

  edit() {
    this.editdatas = this.item;
    console.log(this.editdatas)
    this.createForm()
  }

  createForm() {
    this.AddPackageForm = new FormGroup({
      packname: new FormControl(this.editdatas ? this.editdatas['packname'] : ''),
      cid: new FormControl(this.editdatas ? this.editdatas['cid'] : ''),
      tax_type: new FormControl(this.editdatas ? this.editdatas['tax_type'] : ''),
      amt: new FormControl(this.editdatas ? this.editdatas['amt'] : ''),
      desc: new FormControl(this.editdatas ? this.editdatas['desc'] : ''),
      status: new FormControl(this.editdatas ? this.editdatas['status'] : ''),

    })
  }


  // onkeyupQty(event: any, index: number) { // without type info
  //   //console.log(index, test);
  //   if (event.target.value != "") {
  //     console.log(this.AddServiceForm.value["priceDetails"][index]["qty"], this.AddServiceForm.value["priceDetails"][index]["price"])
  //     var total = Number(this.AddServiceForm.value["priceDetails"][index]["qty"]) * Number(this.AddServiceForm.value["priceDetails"][index]["price"]);
  //     const controlArray = <FormArray>this.AddServiceForm.get('priceDetails');
  //     controlArray.controls[index].get('total').setValue(total);
  //   }
  // }
}
function edit() {
  throw new Error('Function not implemented.');
}

