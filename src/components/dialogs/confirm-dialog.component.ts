import {Component, Input, Output, EventEmitter, Optional} from '@angular/core';

export interface IConfirmDialogSettings {
    title?: string;
    message?: string;
}

export class ConfirmDialogSettings implements IConfirmDialogSettings {
    title: string;
    message: string;

    constructor(settings?: IConfirmDialogSettings) {
        if (settings) {
            this.title = settings.title;
            this.message = settings.message;
        }
    }
}

/**
 * Confirmation dialog component which uses tf-modal-dialog base modal dialog component internally.
 *
 * @example
 * //Example code dynamically generating the component :-
 * openConfirmDialog():void {
      this._dynamicComponentFactory.createComponent(ConfirmDialogComponent, this._viewContainerRef)
      .then((cr) => {
        cr.instance.title = 'Confirm action';
        cr.instance.message = 'Are you sure you want to continue with this action? ';
        cr.instance.closed.subscribe(save => {
          if(save) {

          }
          cr.destroy();
        });
      });
  }
 */
@Component({
    selector: 'tf-confirm-dialog',
    template: `
    <tf-modal-dialog (canceled)="close(false)">
      <div title>{{title}}</div>
      <div body class="message" [innerHTML]="message"></div>
      <div footer>
        <button id="cancelButton" class="btn btn-secondary" (click)="close(false)">
          <span class="glyphicon glyphicon-remove"></span> Cancel
        </button>
        <button id="okButton" class="btn btn-primary" (click)="close(true)">
          <span class="glyphicon glyphicon-ok"></span> OK
        </button>
      </div>
    </tf-modal-dialog>
  `
})
export class ConfirmDialogComponent {
    @Input() title: string;
    @Input() message: string;
    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Optional() settings?: ConfirmDialogSettings) {
        if (settings) {
            this.title = settings.title;
            this.message = settings.message;
        }
    }

    close(save: boolean) {
        this.closed.emit(save);
    }
}

