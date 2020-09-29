import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import { map } from 'rxjs/operators';
import * as fromAuthActions from '../auth/store/auth.actions';
import * as RecipeAction from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, 
    private store: Store<fromApp.AppState>) {}
    collapsed = true;
    isAuthenticated = false;
    isUserSubs: Subscription;

    ngOnInit() {
      // this.isUserSubs = this.authService.user.subscribe((user) => {
      //   this.isAuthenticated = !!user;
      // });
      this.isUserSubs = this.store.select('auth').pipe(map(authState => authState.user)).subscribe((user) => {
        this.isAuthenticated = !!user;
      });
    }



    onSaveData() {
     // this.dataStorageService.storeRecipes();
     this.store.dispatch(new RecipeAction.StoreRecipes());
    }

    onFetchData() {
     // this.dataStorageService.fetchRecipes().subscribe();
     this.store.dispatch(new RecipeAction.FetchRecipes());

    }

    onLogOut() {
      // this.authService.logout();
      this.store.dispatch(new fromAuthActions.Logout());
    }

    ngOnDestroy() {
      this.isUserSubs.unsubscribe();
    }
}
