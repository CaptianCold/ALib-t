/**
 * Created by neal.borelli on 5/24/2016.
 */

import {NullArgumentException} from './error-classes';
import {IntervalDispatcher} from './interval-dispatcher';

const pollingIntervalMs = 200;

export interface IHtmlElementResizedEvent {
    element: HTMLElement;
    oldWidth: number;
    oldHeight: number;
    newWidth: number;
    newHeight: number;
}

export class HtmlElementSizeTracker {
    private static _dispatcher: IntervalDispatcher = new IntervalDispatcher(pollingIntervalMs, true);
    private _oldWidth = 0;
    private _oldHeight = 0;

    constructor(private _element: HTMLElement, private _resizeCallback: (event: IHtmlElementResizedEvent) => void) {
        if (!_element) {
            throw new NullArgumentException('element');
        }

        if (!_resizeCallback) {
            throw new NullArgumentException('resizeCallback');
        }

        this._trackSize();
    }

    public destroy(): void {
        this._element = null;
        this._trackSize = () => { return; };
    }

    private _trackSize(): void {
        if (!this._element || (this._oldWidth && !document.body.contains(this._element))) {
            // stop tracking if the element no longer exists in the document
            return;
        }

        let newWidth = this._element.offsetWidth;
        let newHeight = this._element.offsetHeight;
        if (newWidth !== this._oldWidth || newHeight !== this._oldHeight) {
            let args: IHtmlElementResizedEvent = {
                element: this._element,
                oldWidth: this._oldWidth,
                oldHeight: this._oldHeight,
                newWidth: newWidth,
                newHeight: newHeight
            };
            this._resizeCallback(args);
            this._oldWidth = newWidth;
            this._oldHeight = newHeight;
        }

        HtmlElementSizeTracker._dispatcher.requestCallback(() => this._trackSize());
    }
}
