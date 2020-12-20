import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe('', '', '', []);
  constructor(private recipeService: RecipeService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  onAddToShopiingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients);
    this.snackBarService.openSuccessSnackBar('Ingredients addedd successfully', 'Ok');

  }
}
