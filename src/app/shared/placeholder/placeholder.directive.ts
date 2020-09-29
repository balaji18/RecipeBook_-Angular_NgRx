import { ViewContainerRef, Directive } from '@angular/core';
@Directive({
    selector : '[appPlaceHolder]'
})
export class PlaceHolderDirective {
    constructor(public viewContainerRef: ViewContainerRef)     {

    }
}