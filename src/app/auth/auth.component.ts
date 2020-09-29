import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    closeSub: Subscription;
    storeSub: Subscription;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;
    constructor(private authService: AuthService, private router: Router,
            private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }


    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe((authState) => {
            this.isLoading = authState.loading;
            this.error = authState.authErrorMessage;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        // let authObs: Observable<AuthResponseData>;
        // this.isLoading = true;
        if (this.isLoginMode) {
         // authObs = this.authService.login(email, password);
         this.store.dispatch(new fromAuthActions.LoginStart({email: email, password: password}));
        } else {
        //  authObs = this.authService.onSignUp(email, password);
        this.store.dispatch(new fromAuthActions.SignupStart({email: email, password: password}));

        }
        // authObs.subscribe((response) => {
        //     console.log('response', response);
        //     this.router.navigate(['/recipes']);
        //     this.isLoading = false;
        // },
        // (error) => {
        //     console.log(error);
        //     this.error = error;
        //     this.showErrorAlert(error);
        //     this.isLoading = false;
        // });
        form.reset();
    }

    onHandleError() {
      //  this.error = null;
      this.store.dispatch(new fromAuthActions.ClearError());
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }

        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
