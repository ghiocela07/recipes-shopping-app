import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe | undefined
  constructor(private recipeService: RecipeService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  onAddToShopiingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients);
    this.snackBarService.openSuccessSnackBar('Ingredients addedd successfully', 'Ok');

  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.recipe?.id, 'edit'], { relativeTo: this.route });
  }
}
