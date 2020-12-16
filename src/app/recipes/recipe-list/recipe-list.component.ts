import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe 1', 'This is simply a test', 'https://images-gmi-pmc.edge-generalmills.com/7eb09e32-fb06-4a34-97e6-def91b62164f.jpg'),
    new Recipe('A test recipe 2', 'This is simply a test', 'https://images-gmi-pmc.edge-generalmills.com/7eb09e32-fb06-4a34-97e6-def91b62164f.jpg'),
    new Recipe('A test recipe 3', 'This is simply a test', 'https://images-gmi-pmc.edge-generalmills.com/7eb09e32-fb06-4a34-97e6-def91b62164f.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
  }

}
