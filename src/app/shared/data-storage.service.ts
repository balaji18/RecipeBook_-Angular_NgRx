import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';
import * as RecipesAction from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipesService,
        private authService: AuthService, private store: Store<fromApp.AppState> ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-d30f9.firebaseio.com/recipes.json', recipes, {
            responseType: 'json'
        })
            .subscribe((responseData) => console.log(responseData));
    }

    fetchRecipes() {
       return this.http.get<Recipe[]>('https://ng-course-recipe-book-d30f9.firebaseio.com/recipes.json', {
         responseType: 'json'
        }).pipe
        (map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }), tap(recipes => {
          //  this.recipeService.setRecipes(recipes);

          this.store.dispatch(new RecipesAction.SetRecipes(recipes));
        })
        );
    }

  

    // fetchRecipes() {
    //     return this.authService.user.pipe(take(1),
    //         exhaustMap(user => {
    //             return this.http.get<Recipe[]>('https://ng-course-recipe-book-d30f9.firebaseio.com/recipes.json', {
    //                 params: new HttpParams().set('auth', user.token)
    //             });
    //         }), map(recipes => {
    //             return recipes.map(recipe => {
    //                 return {
    //                     ...recipe,
    //                     ingredients: recipe.ingredients ? recipe.ingredients : []
    //                 };
    //             });
    //         }),
    //         tap(recipes => {
    //             this.recipeService.setRecipes(recipes);
    //         })
    //     );
    // }
}
