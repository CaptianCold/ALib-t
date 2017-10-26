/**
 * Created by yugandhar.ds on 1/24/2017.
 */

import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: 'tf-focus, [tfFocus]'
})
export class FocusDirective implements AfterViewInit {

    constructor(private  _elementRef:ElementRef) {
        console.log('focus returned to child');
    }

    public ngAfterViewInit():void {
        if (this._elementRef) {
            this._elementRef.nativeElement.focus();
        }
    }
}
