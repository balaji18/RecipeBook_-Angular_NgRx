import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipe.actions';
import * as fromApp from './../../store/app.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.action$.pipe(ofType(RecipesAction.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-d30f9.firebaseio.com/recipes.json', {
                responseType: 'json'
            });
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }), map(recipes => {
            return new RecipesAction.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.action$.pipe(ofType(RecipesAction.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
           return this.http.put('https://ng-course-recipe-book-d30f9.firebaseio.com/recipes.json', recipesState.recipes, {
                responseType: 'json'
            });
        })
    );

    constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
