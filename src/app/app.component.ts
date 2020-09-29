import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import {isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from '../app/store/app.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'my-udemy-first-app';
  loadedFeature = 'recipe';

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platFormId) {}

  ngOnInit() {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.platFormId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
