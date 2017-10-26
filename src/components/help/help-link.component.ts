import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';

/**
 * Context sensitive help link
 *
 * @example
 *
 * // Set this at the parent container component
 *  <tf-help-link class="pull-right help-link"></tf-help-link>
 *
 *  // Set this in child component template to set the context specific help page
 *  <div class="flex-col" tfHelpContext="helpPage1.html">
 *  </div>
 *
 *  // Set this in child component template to set the context specific help page
 *  <div class="flex-col" tfHelpContext="helpPage2.html">
 *  </div>
 */
@Component({
    selector: 'tf-help-link',
    styleUrls: ['./help-link.component.scss'],
    template: `<a rel="help" [href]="href" target="_blank" [title]="tooltip">{{caption}}</a>`
})
export class HelpLinkComponent {
    @Input() caption:string = 'Help';
    @Input() tooltip:string = 'Displays context sensitive help';
    @Input() url: string;

    constructor (private _helpService: HelpService) {
    }

    get href():string {
        return this._helpService.mapUrl(this.url || this._helpService.currentHelpUrl) || '';
    }
}
