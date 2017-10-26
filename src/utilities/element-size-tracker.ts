/**
 * Created by neal.borelli on 4/25/2016.
 */

import {NullArgumentException} from './error-classes';
import {ElementRef} from '@angular/core';
import {HtmlElementSizeTracker} from './html-element-size-tracker';

export interface IElementResizedEvent {
    element: ElementRef;
    oldWidth: number;
    oldHeight: number;
    newWidth: number;
    newHeight: number;
}

export class ElementSizeTracker {
    private _sizeTracker: HtmlElementSizeTracker;

    constructor(element: ElementRef, resizeCallback: (event: IElementResizedEvent) => void) {
        if (!element) {
            throw new NullArgumentException('element');
        }

        if (!resizeCallback) {
            throw new NullArgumentException('resizeCallback');
        }

        this._sizeTracker = new HtmlElementSizeTracker(element.nativeElement, (e) => {
            let args = {
                element: element,
                oldWidth: e.oldWidth,
                oldHeight: e.oldHeight,
                newWidth: e.newWidth,
                newHeight: e.newHeight
            };
            resizeCallback(args);
        });
    }

    public destroy(): void {
        this._sizeTracker.destroy();
    }
}
