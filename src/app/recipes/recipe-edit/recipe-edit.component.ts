import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Recipe } from '../../core/models/recipe.model';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  form: FormGroup | undefined;
  id: number = -1;
  editMode = false;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.getRecipeFromForm());
      this.snackBarService.openSuccessSnackBar('Recipe updated successfully!', 'Ok')
    } else {
      this.recipeService.addRecipe(this.getRecipeFromForm());
      this.snackBarService.openSuccessSnackBar('Recipe added successfully!', 'Ok')
    }
    this.navigateBack();
  }

  get ingredientsControls() {
    return (<FormArray>this.form?.get('ingredients')).controls;
  }

  onCancel() {
    this.navigateBack();
  }

  onAddIngredient() {
    (<FormArray>this.form?.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
      })
    )
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.form?.get('ingredients')).removeAt(index);
  }

  hasError(controlName: string, errorType: string) {
    const control = this.form?.get(controlName);
    return control?.hasError(errorType);
  }

  hasArrayGroupItemError(controlName: string, index: number, errorType: string) {
    const formGroup = (<FormArray>this.form?.get('ingredients')).controls[index] as FormGroup;
    return formGroup?.get(controlName)?.hasError(errorType);
  }

  private initForm() {
    let recipe = null;

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    } else {
      recipe = this.recipeService.getNewRecipe();
    }
    let recipeIngredients = new FormArray([]);
    recipe?.ingredients?.forEach(ingredient => {
      recipeIngredients.push(
        new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
        })
      )
    });
    this.form = new FormGroup({
      'name': new FormControl(recipe?.name, Validators.required),
      'imagePath': new FormControl(recipe?.imagePath, Validators.required),
      'description': new FormControl(recipe?.description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  private getRecipeFromForm() {

    //TODO: find a better way to generate the new ID
    let id;
    if (!this.editMode) {
      id = Math.round(Math.random() * 10);
    } else {
      id = this.id;
    }
    // const newRecipe = this.form?.value;
    // newRecipe.id = id;
    return new Recipe(
      id,
      this.form?.value['name'],
      this.form?.value['description'],
      this.form?.value['imagePath'],
      this.form?.value['ingredients']
    );


    // return newRecipe;
  }

  private navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
