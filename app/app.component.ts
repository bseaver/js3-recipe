import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Hello Recipe Box!</h1>
    <div class="row">
      <div class="col-md-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Recipe</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let recipe of recipes">
              <td (click)="recipeClicked(recipe)">{{recipe.title}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-8">
      </div>
    </div>
  </div>
  `
})

export class AppComponent {
  recipes: Recipe[] = [
    new Recipe('Stew', ['water', 'meat', 'potatoes'],
      "Boil water.\nAdd potatoes.\nBrown meat.\nAdd to pot.\n"),
    new Recipe('Cookies', ['flour', 'sugar', 'eggs', 'butter', 'milk'],
      "Mix.\nPut in oven.\nBake at 350 for 20 min. until golden bronw.\n")
  ];

  recipeClicked(recipe) {
    alert(recipe.title);
  }
}

export class Recipe {
  constructor(public title: string, ingredients: string[], directions: string) { }
}
