import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm | undefined;
  selectedIngredientSubscription: Subscription | undefined;
  editMode = false;
  selectedItemIndex: number = 0;
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

  ngOnDestroy() {
    this.selectedIngredientSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const formData = form.value;
    const newIngredient = new Ingredient(formData.name, formData.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.selectedItemIndex, newIngredient);
      this.snackBarService.openSuccessSnackBar('Ingredient edited succesfully!', 'Ok')
    } else {
      this.shoppingListService.addIngredient(newIngredient);
      this.snackBarService.openSuccessSnackBar('Ingredient added succesfully!', 'Ok')
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.clearForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.snackBarService.openSuccessSnackBar('Ingredient deleted succesfully!', 'Ok')
    this.clearForm();
  }

  clearForm() {
    this.form?.reset();
    this.editMode = false;
  }

}
