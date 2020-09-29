import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping_list] Add Ingredient'; // ADD_INGREDIENT
export const ADD_INGREDIENTS = '[Shopping_list] Add Ingredients'; // ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping_list] Update Ingredient'; // UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping_list] Delete Ingredient'; // DELETE_INGREDIENT';
export const START_EDIT = '[Shopping_list] Start edit'; // START_EDIT;
export const STOP_EDIT = '[Shopping_list] Stop edit'; // STOP_EDIT';


export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    // constructor(public payload: {index: number, ingredient: Ingredient}) {}
    constructor(public payload: Ingredient) {}

}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    // constructor(public payload: number) {}
    constructor() {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions =
        AddIngredient |
        AddIngredients |
        UpdateIngredient |
        DeleteIngredient |
        StartEdit |
        StopEdit ;
