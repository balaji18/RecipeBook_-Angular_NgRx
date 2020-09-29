import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() receipeWasSelected = new EventEmitter();
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.subscription = this.recipesService.recipeChanged.
    //   subscribe((recipe: Recipe[]) => this.recipes = recipe);
    // this.recipes = this.recipesService.getRecipes();

    // Using Ngrx

    this.subscription = this.store.select('recipes')
    .pipe(
      map(recipeData => recipeData.recipes))
      .subscribe((recipe: Recipe[]) => this.recipes = recipe);
  }

  // onReceipeSelected(receipe: Recipe) {
  //   this.receipeWasSelected.emit(receipe);

  // }

  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
