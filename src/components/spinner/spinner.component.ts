import {Component, Input} from '@angular/core';

/**
 * Spinner component used to indicate loading/ wait state.
 * @example
 * <div [tfSpinner]="isSpin" >
 *      Section content
 * </div>
 */
@Component({
    selector: 'tf-spinner, [tfSpinner]',
   /* host: {
        'class': 'spinner-area'
    }, */
    styleUrls: ['./spinner.component.scss'],
    template: `
    <ng-content></ng-content>
    <div class="spinner-backdrop" *ngIf="spin"><div class="spinner"></div></div>
  `
})
export class SpinnerComponent {
    @Input() spin: boolean = false;

    // allow easier usage when used as an attribute
    @Input('tfSpinner') set spinValue(value: boolean) {
        if(typeof value === 'boolean') {
            this.spin = value;
        }
    }
}
