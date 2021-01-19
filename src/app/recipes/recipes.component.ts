import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../core/services/recipe.service';
import { Recipe } from '../core/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  constructor() { }


}
