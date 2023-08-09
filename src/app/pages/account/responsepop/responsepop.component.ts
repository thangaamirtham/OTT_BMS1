import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-responsepop',
  templateUrl: './responsepop.component.html',
  styleUrls: ['./responsepop.component.scss']
})
export class ResponsepopComponent implements OnInit {

  submit: boolean = false; item; modalHeader;
  formattedResponse;
  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,

  ) { }

  closeModal() {
    this.activeModal.close(true);
    if (this.item[0]['error_msg'] == 0) {
      this.router.navigate(['/pages/account/invoice']);
    }
  }

  ngOnInit() {
    this.formattedResponse = JSON.parse(this.item['res_msg']);
    console.log('Response',this.formattedResponse,'msg',this.formattedResponse['message']);
    
  }

}
