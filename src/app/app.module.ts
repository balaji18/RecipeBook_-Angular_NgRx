import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ShortenPipe } from './shorten.pipe';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core-module';
import * as fromApp from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { AuthReducer } from './auth/store/auth.reducers';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShortenPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
   // StoreModule.forRoot({shoppingList: ShoppingListReducer, auth: AuthReducer})
   StoreModule.forRoot(fromApp.appReducer),
   EffectsModule.forRoot([AuthEffects, RecipeEffects]),
   StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
