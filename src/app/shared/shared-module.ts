import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [AlertComponent, LoadSpinnerComponent, DropdownDirective, PlaceHolderDirective],
    imports: [CommonModule],
    exports: [AlertComponent, LoadSpinnerComponent, DropdownDirective, PlaceHolderDirective, CommonModule],
    entryComponents: [AlertComponent]

})
export class SharedModule {}
