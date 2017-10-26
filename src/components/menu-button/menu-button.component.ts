/**
 * Created by neal.borelli on 4/22/2016.
 * Very simple encapsulation of a Bootstrap menu button
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'tf-menu-button',
    host: {
        'class': 'btn-group'
    },
    styleUrls: ['./menu-button.component.scss'],
    template: `
    <button 
        class="btn dropdown-toggle" 
        [ngClass]="isPrimary?'btn-primary':'btn-default'" 
        data-toggle="dropdown" 
        [class.disabled]="isDisabled" 
        [disabled]="isDisabled">
        <span [ngClass]="captionIconClassName ? captionIconClassName : ''"></span>
        {{caption}} <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu" role="menu">
        <ng-content></ng-content>
    </ul>
  `
})
export class MenuButtonComponent {
    @Input() caption: string = 'Actions';
    @Input() captionIconClassName: string|null = null;
    @Input() isPrimary: boolean = false;
    @Input() isDisabled: boolean = false;
}
