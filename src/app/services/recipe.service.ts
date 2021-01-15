import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) { }

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         1,
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    // tslint:disable-next-line: max-line-length
    //         'https://previews.123rf.com/images/voltan1/voltan11802/voltan1180200102/95164532-tasty-schnitzel-with-cucumber-salad-on-white-plate-close-up-view.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         2,
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://i.insider.com/5a85feb142e1cc26ea3e9afb?width=600&format=jpeg&auto=webp',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Cheese', 2)
    //         ])
    // ];
    private recipes: Recipe[] = [];

    getNewRecipe(): Recipe {
        return new Recipe(0, '', '', '', []);
    }

    getRecipes(): Recipe[] {
        // slice return a copy of the full array -> to not access the original array from outside ; get a copy
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe | undefined {
        return this.recipes.find(
            (r: Recipe) => r.id === id
        );
    }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes?.slice());
    }

    addRecipe(recipe: Recipe): void {
        this.recipes?.push(recipe);
        this.recipesChanged.next(this.recipes?.slice());
    }

    updateRecipe(id: number, newRecipe: Recipe): void {
        const updatedRecipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
        this.recipes[updatedRecipeIndex] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number | undefined): void {
        const deletedRecipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
        this.recipes.splice(deletedRecipeIndex, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[] | undefined): void {
        if (ingredients) {
            this.shoppingListService.addIngredients(ingredients);
        }
    }
}
