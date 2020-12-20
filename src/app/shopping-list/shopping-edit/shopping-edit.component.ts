import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput') amountInputRef: ElementRef | undefined;

  constructor(private shoppingListService: ShoppingListService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  onAddItem(): void {
    const ingredientName = this.nameInputRef?.nativeElement.value;
    const ingredientAmount = this.amountInputRef?.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient);
    this.snackBarService.openSuccessSnackBar('Ingredient added succesfully!', 'Ok')
  }

}
