import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({
    providedIn: 'root',
})
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe(
            1,
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://previews.123rf.com/images/voltan1/voltan11802/voltan1180200102/95164532-tasty-schnitzel-with-cucumber-salad-on-white-plate-close-up-view.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            2,
            'Big Fat Burger',
            'What else you need to say?',
            'https://i.insider.com/5a85feb142e1cc26ea3e9afb?width=600&format=jpeg&auto=webp',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
                new Ingredient('Cheese', 2)
            ])
    ];

    getRecipes() {
        // slice return a copy of the full array -> to not access the original array from outside ; get a copy
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find(
            (r: Recipe) => r.id === id
        );
    }

    addIngredientsToShoppingList(ingredients: Ingredient[] | undefined) {
        if (ingredients) {
            this.shoppingListService.addIngredients(ingredients);
        }
    }
}