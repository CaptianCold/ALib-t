/**
 * Created by divya.raghunathan on 5/12/2017.
 */

import {
    Component, Input, OnInit, OnDestroy, Output, EventEmitter, HostListener, OnChanges, SimpleChange
} from '@angular/core';

const defaultSpinnerOptions : ITouchSpinOptions = {
    buttonDownClass: 'btn btn-default',
    buttonUpClass: 'btn btn-default',
    max: 100,
    min: 0,
    step: 1,
    decimals: 0,
    //boostat: 5,
    mousewheel: true,
    prefix: '',
    postfix: '',
    stepInterval: 100,
    stepIntervalDelay: 500,
    verticalButtons: true,
    verticalDownClass: 'glyphicon glyphicon-chevron-down',
    verticalUpClass: 'glyphicon glyphicon-chevron-up'
};

@Component({
    moduleId: module.id,
    selector: 'tf-number-spinner',
    styleUrls: ['./number-spinner.component.scss'],
    templateUrl: 'number-spinner.component.html'
})
/**
 * Number spinner control
 * Supports keyboard up/down, mouse scrolling and button clicks for value incrementing.
 * Angular wrapper for the http://www.virtuosoft.eu/code/bootstrap-touchspin/
 *
 * @example:-
 * <tf-number-spinner [(value)]="maxValue" [touchSpinOptions]="maxValueSpinnerOptions" id="maxValue">
 * </tf-number-spinner>
 *
 * Attributes :-
 *  - value :- Value to be bound to the input text box of the spinner
 *  - touchSpinOptions :- Options object which could be set to override default spinner option settings.
 */
export class NumberSpinnerComponent implements OnInit, OnChanges, OnDestroy{

    /**
     * Event that is raised when the value changes
     * @type {EventEmitter<string>}
     */
    @Output() public valueChange = new EventEmitter<string>();
    @Input() touchSpinOptions: ITouchSpinOptions = {};
    public disabled : boolean = false;
    public val : string;
    /**
     * Gets the value of the number spinner input text box
     * @returns {string}
     */
    @Input() public get value(): string {
        return this.val;
    }

    /**
     * Sets the value of the number spinner input text box
     * @param newValue
     */
    public set value(newValue: string) {
        if (newValue !== this.val) {
            this.val = newValue;
            this._notifyValueChanged();
        }
    }

    /**
     * Gets or sets the number of milliseconds to delay raising the valueChange event (de-bounce). Defaults to 250ms.
     * @type {number}
     */
    @Input() public changeDelay: number = 250;

    private _timeoutHandle = 0;
    private _clickStart: number;
    private _focused: boolean;
    private _oldVal: string;
    private _timeout: number;
    private _timer: number;

    public ngOnInit() : void {
        if(!this._oldVal) {
            this._oldVal = this.value;
        }
        this._prepareOptions();
    }

    public ngOnChanges(changes:{[propertyName:string]:SimpleChange}): void {
        let optionsChange: SimpleChange = changes['touchSpinOptions'];
        if (!optionsChange) {
            return;
        }
        let newOptions : ITouchSpinOptions = changes['touchSpinOptions'].currentValue;
        if(newOptions) {
            this.touchSpinOptions = newOptions;
            this._prepareOptions();
        }
    }

    public ngOnDestroy() : void {
        window.clearTimeout(this._timeout);
        window.clearInterval(this._timer);
    }

    public keyUp(event: KeyboardEvent) : void {
        let code = <number>(<any>event).keyCode || event.which;

        if (code === Char.ArrowDown || code === Char.ArrowUp) {
            this.stopSpin(event);
        }
    }

    public keyDown(event: KeyboardEvent) : void {
        let  code = <number>(<any>event).keyCode || event.which;

        if (code === Char.ArrowUp) {
            this._increment();

            event.preventDefault();
        }
        else if (code === Char.ArrowDown) {
            this._decrement();

            event.preventDefault();
        }
    }

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: MouseWheelEvent) {
        if(!this._focused) {
            return;
        }
        this._mouseWheelEvent(event);
        //console.log('Mouse wheel scrolled');
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: MouseWheelEvent) {
        if(!this._focused) {
            return;
        }
        this._mouseWheelEvent(event);
        //console.log('Mouse wheel scrolled');
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: MouseWheelEvent) {
        if(!this._focused) {
            return;
        }
        this._mouseWheelEvent(event);
    }

    public startSpinUp(event : MouseEvent) : void {
        event.stopPropagation();
        this.checkValue();
        this._increment();
        event.preventDefault();
        this._clickStart = Date.now();

        this._timeout = window.setTimeout(() => {
            //console.log('Inside timeout block');
            this._timer = window.setInterval(() => {
                //console.log('Inside timer block');
                this._increment();
                event.preventDefault();
            }, this.touchSpinOptions.stepInterval);
        }, this.touchSpinOptions.stepIntervalDelay);
    }

    public startSpinDown(event : MouseEvent) : void {
        event.stopPropagation();
        this.checkValue();

        this._decrement();
        event.preventDefault();

        this._clickStart = Date.now();
        this.stopSpin(event);

        window.setTimeout(() => {
            this._timer = window.setInterval(() => {
                this._decrement();
                event.preventDefault();
            }, this.touchSpinOptions.stepInterval);
        }, this.touchSpinOptions.stepIntervalDelay);

    }

    public stopSpin(event : UIEvent) : void {
        //console.log('StopSpin');
        event.stopPropagation();

        if ((Date.now() - this._clickStart > this.touchSpinOptions.stepIntervalDelay)) {
            //console.log('Clear timeout and timer 1');
            window.clearInterval(this._timer);
            window.clearTimeout(this._timeout);
        } else {
            window.setTimeout(() => {
                //console.log('Clear timeout and timer 2');
                window.clearInterval(this._timer);
                window.clearTimeout(this._timeout);
            }, this.touchSpinOptions.stepIntervalDelay);
        }
    }

    public checkValue() : void {
        if (!this.val || this.val.trim().length == 0) {
            this._changeValue(this.touchSpinOptions.min);
        }
        else if (!this.val.match(/^-?(?:\d+|\d*\.\d+)$/i)) {
            if (this._oldVal && this._oldVal !== '') {
                this._changeValue(parseFloat(this._oldVal))
            }
            else {
                this._changeValue(this.touchSpinOptions.min);
            }
        }
        else {
            let value = parseFloat(this.val);

            if (value > this.touchSpinOptions.max) {
                this._changeValue(this.touchSpinOptions.max);
            }
            else if (value < this.touchSpinOptions.min) {
                this._changeValue(this.touchSpinOptions.min);
            }
            else {
                this._changeValue(value);
            }
        }
        this._focused = false;
    }

    public focus() : void {
        this._focused = true;
    }


    /**
     * Handles the change notification and de-bounces the event
     * @private
     */
    private _notifyValueChanged(): void {
        // If we have a pending timeout cancel it.
        if (this._timeoutHandle !== 0) {
            window.clearTimeout(this._timeoutHandle);
            this._timeoutHandle = 0;
        }

        if (this.changeDelay <= 0) {
            this.valueChange.emit(this.val);
        } else {
            // Schedule a new timeout based on the changeDelay value
            this._timeoutHandle = window.setTimeout(() => {
                this.valueChange.emit(this.val);
                this._timeoutHandle = 0;
            }, this.changeDelay);
        }
    }

    private _prepareOptions() : void {
        if(!this.touchSpinOptions) {
            this.touchSpinOptions = defaultSpinnerOptions;
        } else {
            // Merge the options, overwrite the default options with the user set options if any
            this.touchSpinOptions = Object.assign({}, defaultSpinnerOptions, this.touchSpinOptions );
        }

        let value = this.val || this.touchSpinOptions.min;

        this._changeValue(Number(value));
    }

    private _changeValue (value: number) {
        let decimalValue = Math.pow(10, this.touchSpinOptions.decimals);
        value = Math.round(value * decimalValue) / decimalValue;
        this.val = value.toFixed(this.touchSpinOptions.decimals);
        this._notifyValueChanged();
    }

    private _decrement() : void {
        let value = parseFloat(this.val) - this.touchSpinOptions.step;

        if (value < this.touchSpinOptions.min) {
            this._changeValue(this.touchSpinOptions.min);

            return;
        }

        this._changeValue(value);
    }

    private _increment() : void {
        let value = parseFloat(this.val) + this.touchSpinOptions.step;

        if (value > this.touchSpinOptions.max) {
            this._changeValue(this.touchSpinOptions.max);

            return;
        }
        this._changeValue(value);
    }


    private _mouseWheelEvent(mouseEvent : MouseWheelEvent) : void  {
        let event = <MouseWheelEvent> (window.event || mouseEvent ); // old IE support
        let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if(delta > 0) {
            //Mouse wheel scrolled up
            //console.log('Mouse wheel up');
            this._scrollUp(event);
        } else if(delta < 0) {
            //Mouse wheel scrolled down
            //console.log('Mouse wheel down');
            this._scrollDown(event);
        }
    }

    private _scrollUp(event : MouseWheelEvent) : void {
        this._increment();
        event.preventDefault();
    }

    private _scrollDown(event: MouseWheelEvent) : void {
        this._decrement();
        event.preventDefault();
    }

}

const enum Char {
    ArrowDown = 40,
    ArrowUp = 38
}

export interface ITouchSpinOptions {
    min?: number;
    max?: number;
    step?: number;
    //boostat ?: number;
    decimals?: number;
    stepInterval?: number;
    //forceStepDivisibility?: string; // none | floor | round | ceil
    stepIntervalDelay?: number;
    verticalButtons?: boolean;
    verticalUpClass?: string;
    verticalDownClass?: string;
    prefix?: string;
    postfix?: string;
    prefixExtraClass?: string;
    postfixExtraClass?: string;
    mousewheel?: boolean;
    buttonDownClass?: string;
    buttonUpClass?: string;
    buttonDownText?: string;
    buttonUpText?: string;
}
