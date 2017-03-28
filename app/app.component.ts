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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let recipe of recipes; let idx = index;">
              <td (click)="recipeClicked(recipe)">{{recipe.title}}</td>
              <td><button (click)="deleteRecipe(idx)" class="btn btn-default">Delete</button></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
            <td><button (click)="newRecipe()" class="btn btn-default">New Recipe</button></td>
            <td></td>
            </tr>
          </tfoot>
        </table>
      </div> <!-- col -->

      <div class="col-md-8">
        <form *ngIf="clickedRecipe" class="form-horizontal">
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
                <tr>
                <td><input [value]="addThisIngredient" (input)="addThisIngredient = $event.target.value" class="form-control" name="ingredient" placeholder="Enter ingredient"></td>
                <td><button (click)="addIngredient()" class="btn btn-default">Add</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="form-group">
            <label for="directions">Directions:</label>
            <textarea [(ngModel)]="clickedRecipe.directions" rows=10 class="form-control" name="directions" placeholder="List instructions"></textarea>
          </div>
          <div class="form-group">
            <button (click)="hideRecipe()" class="btn btn-default">Hide</button>
          </div>
        </form>
      </div> <!-- col -->
    </div> <!-- row -->
  </div> <!-- container -->
  `
})

export class AppComponent {
  clickedRecipe: Recipe = null;
  addThisIngredient: string = "";

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

  addIngredient() {
    if (this.addThisIngredient) {
      this.clickedRecipe.ingredients.push(this.addThisIngredient);
      this.addThisIngredient = "";
    }
  }

  newRecipe() {
    this.clickedRecipe = new Recipe();
    this.recipes.push(this.clickedRecipe);
  }

  deleteRecipe(idx) {
    let recipe = this.recipes[idx];
    if (recipe === this.clickedRecipe) {
      this.hideRecipe();
    }
    this.recipes.splice(idx, 1);
  }
}

export class Recipe {
  constructor(public title: string = "", public ingredients: string[] = [], public directions: string = "") { }
}
