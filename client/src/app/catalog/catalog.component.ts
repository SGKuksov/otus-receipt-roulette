import { Component, OnInit } from '@angular/core';
import {RecieptService} from "../reciept.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public list: Reciept[];

  constructor(
    private recieptService: RecieptService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.recieptService.getRecieptList().subscribe(res => {
      this.list = res;
    });
  }

}
