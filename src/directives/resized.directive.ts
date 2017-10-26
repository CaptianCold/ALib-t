/**
 * Created by neal.borelli on 4/25/2016.
 */

import {Directive, Output, ElementRef, EventEmitter, OnDestroy} from '@angular/core';
import {ElementSizeTracker, IElementResizedEvent} from '../utilities/element-size-tracker';

@Directive({ selector: '[tfResized]' })
/**
 * Adds a resize event to individual elements that have this directive
 */
export class ResizedDirective implements OnDestroy {
    @Output() tfResized = new EventEmitter<IElementResizedEvent>();
    private _tracker: ElementSizeTracker;

    constructor(element: ElementRef) {
        this._tracker = new ElementSizeTracker(element, (args: IElementResizedEvent) => this.tfResized.emit(args));
    }

    ngOnDestroy(): void {
        this._tracker.destroy();
        this._tracker = null;
    }
}
