/**
 * Created by neal.borelli on 10/25/2016.
 */

import {Directive, Input, HostListener, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {HelpService} from './help.service';

@Directive({ selector: '[tfHelpContext]' })
export class HelpContextDirective implements OnChanges, OnDestroy {
    @Input('tfHelpContext') public helpUrl:string;

    constructor(private _helpService: HelpService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        let previousValue = changes['helpUrl'].previousValue;
        if (typeof previousValue === 'string') {
            this._helpService.updateHelpUrl(<string> previousValue, this.helpUrl);
        } else {
            this._helpService.addHelpUrl(this.helpUrl);
        }
    }

    ngOnDestroy(): void {
        this._helpService.removeHelpUrl(this.helpUrl);
    }

    @HostListener('help', ['$event'])
    protected _handleHelpEvent(event: Event):boolean {
        this._helpService.openHelp(this.helpUrl);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    @HostListener('keydown', ['$event'])
    protected _handleKeydownEvent(event:KeyboardEvent):boolean {
        return this._helpService.isHelpKeyEvent(event) ? this._handleHelpEvent(event) : true;
    }
}
