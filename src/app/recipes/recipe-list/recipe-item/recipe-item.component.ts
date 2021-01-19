import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Recipe } from '../../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipe: Recipe | undefined;
  @Input() recipeId: number = -1;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe(this.recipeId);
  }

  isRouteActive() {
    return this.router.isActive('/recipes/' + this.recipeId, false);
  }

}
