/**
 * Created by neal.borelli on 4/19/2016.
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Search box input component
 *
 * @example
 * //In HTML :-
 * <tf-search-box [(value)]="searchText" placeholder = "Search a country"></tf-search-box>
 *
 * //In component code :-
 * get searchText(): string {
    return this._searchText;
  }

 set searchText(value: string) {
    if (value !== this._searchText) {
      this._searchText = value;
      this._performSearch(value);
    }
  }
 *
 */
@Component({
  selector: 'tf-search-box',
  host: {
    'class': 'input-group'
  },
  styleUrls: ['./search-box.component.scss'],
  template: `
    <div class="input-group">
        <input id="searchInput" type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="value">
        <span class="input-group-btn">
            <button id="clearSearch"
                    class="btn btn-default"
                    type="button"
                    [disabled]="!value"
                    (click)="value=''">x</button>
        </span>
    </div>
    `
})
/**
 * Implements a Bootstrap styled search box and hides the semantic complexity of Bootstrap
 */
export class SearchBoxComponent {
  /**
   * Event that is raised when the value changes
   * @type {EventEmitter<string>}
   */
  @Output() public valueChange = new EventEmitter<string>();

  /**
   * Gets or sets the placeholder text for the search box.  Defaults to "Search"
   * @type {string}
   */
  @Input() public placeholder: string = 'Search';

  /**
   * Gets or sets the number of milliseconds to delay raising the valueChange event (de-bounce). Defaults to 250ms.
   * @type {number}
   */
  @Input() public changeDelay: number = 250;
  private _value: string = '';
  private _timeoutHandle = 0;

  /**
   * Gets the value of the search box
   * @returns {string}
   */
  @Input() public get value(): string {
    return this._value;
  }

  /**
   * Sets the value of the search box
   * @param newValue
   */
  public set value(newValue: string) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._notifyValueChanged();
    }
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
      this.valueChange.emit(this.value);
    } else {
      // Schedule a new timeout based on the changeDelay value
      this._timeoutHandle = window.setTimeout(() => {
        this.valueChange.emit(this.value);
        this._timeoutHandle = 0;
      }, this.changeDelay);
    }
  }
}
