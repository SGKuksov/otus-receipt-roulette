import {Component, OnInit} from '@angular/core';
import {RecieptService} from "../reciept.service";

interface Step {
  picture: string;
  description: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public model: Reciept;
  public ingredientsList: [{
    ingredient: Ingredient;
    amount: number;
  }] = [{ingredient: {_id: "", name: ""}, amount: 0}];
  public stepList: Step[] = [];

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

  showSuccess() {
  }

  showError() {
  }

  addIngredient() {
    this.ingredientsList.push({ingredient: {_id: "", name: ""}, amount: 0})
  }

  addStep() {
    this.stepList.push({
      description: "",
      picture: "",
    })
  }
}
