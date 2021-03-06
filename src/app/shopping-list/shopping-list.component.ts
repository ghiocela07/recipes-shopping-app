import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { Ingredient } from '../core/models/ingredient.model';
import { LoggingService } from '../core/services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredientsChangedSubscription: Subscription | undefined;
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
    this.loggingService.printLog('Hello from shopping list  component - ngOnInit');
  }

  ngOnDestroy(): void {
    if (this.ingredientsChangedSubscription) {
      this.ingredientsChangedSubscription.unsubscribe();
    }
  }

  onEditItem(index: number): void {
    this.shoppingListService.selectedIngredient.next(index);
  }
}
