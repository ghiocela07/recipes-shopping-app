import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    apiUrl = 'https://my-first-app-a35ea-default-rtdb.firebaseio.com/';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.apiUrl + 'recipes.json', recipes).subscribe(
            response => console.log(response)
        );
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.authService.userSubject.pipe(take(1), exhaustMap(userSubject => {
            return this.http.get<Recipe[]>(this.apiUrl + 'recipes.json')
                .pipe(map(recipes => {
                    return recipes?.map(recipe => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }), tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
        }));


    }
}
