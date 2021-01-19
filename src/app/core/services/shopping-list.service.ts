import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    selectedIngredient = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tommatos', 4),
        new Ingredient('Cucumbers', 8),
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]): void {
        // ingredients.forEach(ingredient => {
        //     this.addIngredient(ingredient);
        // });
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
