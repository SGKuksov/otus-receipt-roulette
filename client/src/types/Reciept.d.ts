interface Reciept {
  _id: string;
  name: string;
  category: string;
  complexity: number;
  time: string;
  description: string;
  ingredients: {
    ingredient: Ingredient;
    amount: number;
  };
  steps: [{
    picture: string;
    description: string;
  }]
}
