import {Component, OnInit} from '@angular/core';
import {RecieptService} from "../reciept.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reciept-page',
  templateUrl: './reciept-page.component.html',
  styleUrls: ['./reciept-page.component.scss']
})
export class RecieptPageComponent implements OnInit {
  public recieptInfo: Reciept;
  private id: string;

  constructor(
    private recieptService: RecieptService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecieptInfo(this.id);
  }

  getRecieptInfo(id) {
    this.recieptService.getReciept(id).subscribe(res => {
      this.recieptInfo = res;
    });
  }
}
