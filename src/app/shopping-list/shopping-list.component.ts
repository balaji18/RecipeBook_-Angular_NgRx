import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
// import * as fromShoppingList from './store/shopping-list.reducer';
import * as shoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  isChanged: Subscription;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getAllIngredients();
    // this.isChanged = this.shoppingListService.ingredientsChanged.
    // subscribe
    // ((ingredient: Ingredient[]) => {
    //   this.ingredients = ingredient;
    // });
  }

  ngOnDestory() {
  //  this.isChanged.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number) {
   // this.shoppingListService.startEditing.next(index);
   this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
}
