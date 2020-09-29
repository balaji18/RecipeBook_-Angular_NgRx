import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as RecipesAction from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStoargeService: DataStorageService,
        private recipesService: RecipesService,
        private store: Store<fromApp.AppState>,
        private actions$: Actions) {}

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const recipes = this.recipesService.getRecipes();
    //     if (recipes.length === 0) {
    //         return this.dataStoargeService.fetchRecipes();
    //     } else {
    //         return recipes;
    //     }
    // }

    // Using NgRX

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return  this.store.select('recipes').pipe(take(1),
        map(recipeState => {
            return recipeState.recipes;
        }),
        switchMap(recipes => {
            if (recipes.length === 0) {
                this.store.dispatch(new RecipesAction.FetchRecipes());
                return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
            } else {
                return of(recipes);
            }
        })
        );
    }
}
