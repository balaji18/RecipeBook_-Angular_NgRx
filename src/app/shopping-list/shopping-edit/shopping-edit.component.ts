import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
// import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  //  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f', { static: false }) slForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editModeIndex: number;
  editModeItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    // this.editSubscription = this.shoppingListService.startEditing.subscribe((index: number) => {
    //   this.editModeIndex = index;
    //   this.editMode = true;
    //   this.editModeItem = this.shoppingListService.getIngredient(index);
    //   this.slForm.setValue({
    //     name: this.editModeItem.name,
    //     amount: this.editModeItem.amount
    //   });
    // });

   this.editSubscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
      //  this.editModeIndex = stateData.editedIngredientIndex;
        this.editMode = true;
        this.editModeItem = stateData.editedIngredient;
        this.slForm.setValue({
              name: this.editModeItem.name,
              amount: this.editModeItem.amount
          });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    // const newIngredientName = this.nameInputRef.nativeElement.value;
    // const newIngredientAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if (this.editMode) {
     // this.shoppingListService.updateIngredient(this.editModeIndex, newIngredient);
    // this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editModeIndex, ingredient: newIngredient}));
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));

    } else {
     // this.shoppingListService.addNewIngredient(newIngredient);
     this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
   // this.shoppingListService.deleteIngredient(this.editModeIndex);
  //  this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editModeIndex));
  this.store.dispatch(new ShoppingListActions.DeleteIngredient());

   this.onClear();
  }

}
