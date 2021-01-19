import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from 'src/app/core/services/shopping-list.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm | undefined;
  selectedIngredientSubscription: Subscription | undefined;
  editMode = false;
  selectedItemIndex = 0;
  editedItem: Ingredient | undefined;

  constructor(private shoppingListService: ShoppingListService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.selectedIngredientSubscription = this.shoppingListService.selectedIngredient
      .subscribe((index: number) => {
        this.editMode = true;
        this.selectedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  ngOnDestroy(): void {
    this.selectedIngredientSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const formData = form.value;
    const newIngredient = new Ingredient(formData.name, formData.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.selectedItemIndex, newIngredient);
      this.snackBarService.openSuccessSnackBar('Ingredient edited succesfully!', 'Ok');
    } else {
      this.shoppingListService.addIngredient(newIngredient);
      this.snackBarService.openSuccessSnackBar('Ingredient added succesfully!', 'Ok');
    }
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.clearForm();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.snackBarService.openSuccessSnackBar('Ingredient deleted succesfully!', 'Ok');
    this.clearForm();
  }

  clearForm(): void {
    this.form?.reset();
    this.editMode = false;
  }

}
