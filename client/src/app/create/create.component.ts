import {Component, OnInit} from '@angular/core';
import {RecieptService} from "../reciept.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  model

  constructor(
    private recieptService: RecieptService,
  ) {
  }

  ngOnInit(): void {
  }

  create() {
    this.recieptService.createReciept(this.model).subscribe(res => {
      if (res.status === 200) {
        //  Show success
      } else {
        //  Show error
      }
    });
  }

  showSuccess() {}
  showError() {}

}
