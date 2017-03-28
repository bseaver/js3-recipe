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
      </div> <!-- col -->

      <div class="col-md-8">
        <form *ngIf="clickedRecipe" (submit)="hideRecipe()" class="form-horizontal">
          <div class="form-group">
            <label for="title">Title:</label>
            <input [(ngModel)]="clickedRecipe.title" type="text" placeholder="Recipe name" name="title" class="form-control">
          </div>

          <div class="form-group">
            <label>Ingredients:</label>

            <table class="table table-striped">
              <tbody>
                <tr *ngFor="let ingredient of clickedRecipe.ingredients; let idx = index;">
                  <td><input [value]="clickedRecipe.ingredients[idx]" (input)="clickedRecipe.ingredients[idx] = $event.target.value" class="form-control" name="ingredient" placeholder="Enter ingredient"></td>
                  <td><button (click)="deleteIngredient(idx)" class="btn btn-default">Delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="form-group">
            <label for="directions">Directions:</label>
            <textarea [(ngModel)]="clickedRecipe.directions" rows=10 class="form-control" name="directions" placeholder="List instructions"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default">Hide</button>
          </div>
        </form>
      </div> <!-- col -->
    </div> <!-- row -->
  </div> <!-- container -->
  `
})

export class AppComponent {
  clickedRecipe: Recipe = null;
  recipes: Recipe[] = [
    new Recipe('Stew', ['water', 'meat', 'potatoes'],
      "Boil water.\nAdd potatoes.\nBrown meat.\nAdd to pot.\n"),
    new Recipe('Cookies', ['flour', 'sugar', 'eggs', 'butter', 'milk'],
      "Mix.\nPut in oven.\nBake at 350 for 20 min. until golden brown.\n")
  ];

  recipeClicked(recipe) {
    this.clickedRecipe = recipe;
  }

  hideRecipe() {
    this.clickedRecipe = null;
  }

  deleteIngredient(idx) {
    this.clickedRecipe.ingredients.splice(idx, 1);
  }
}

export class Recipe {
  constructor(public title: string, public ingredients: string[], public directions: string) { }
}
