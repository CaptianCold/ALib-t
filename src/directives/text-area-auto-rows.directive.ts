import { Directive, Input, OnChanges, OnDestroy, AfterViewInit, ElementRef, HostListener } from '@angular/core';

/**
 * A directive that will automatically adjust the rows property of a textarea element to fit the content.
 * @
 * @example <textarea tfAutoRows [minRows]="1" [maxRows]="5"></textarea>
 */
@Directive({
  selector: 'textarea[tfAutoRows]'
})
export class TextAreaAutoRowsDirective implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * The minimum number of rows to show in the text area.  Defaults to 1.
   */
  @Input() minRows = 1;

  /**
   * The maximun number of rows to show in the text area.  Defaults to 999.
   */
  @Input() maxRows = 999;

  private _oldWidth = 0;
  private _oldHeight = 0;
  private _watchSizeInterval: number;

  /**
   * The constructor
   * @constructor
   * @param {ElementRef} _element The ElementRef for the text area
   */
  constructor(private _element: ElementRef) {
  }

  ngOnDestroy(): void {
    window.clearInterval(this._watchSizeInterval);
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => this._adjustRows(), 50);
    this._watchSizeInterval = window.setInterval(() => this._checkForSizeChange(), 100);
  }

  ngOnChanges(changes: any): void {
    this._adjustRows();
  }

  /**
   * Adjusts the rows property of the textarea element.
   */
  private _adjustRows(): void {
    adjustTextAreaRows(this._element.nativeElement, this.minRows, this.maxRows);
  }

  /**
   * Checks to see if the element size has changed and will adjust the rows if it has.
   */
  private _checkForSizeChange(): void {
    const element: HTMLElement = this._element.nativeElement;
    if (element.offsetWidth !== this._oldWidth || element.offsetHeight !== this._oldHeight) {
      this._oldWidth =  element.offsetWidth;
      this._oldHeight = element.offsetHeight;
      this._adjustRows();
    }
  }

  /**
   * Listen for any changes to the contents of the text area
   */
  @HostListener('input', ['$event'])
  private _input(event: Event): void {
    this._adjustRows();
  }

  /**
   * Listen to window resize events to sometimes be more responsive to size changes
   */
  @HostListener('window:resize')
  private _windowResize(): void {
    this._checkForSizeChange();
  }
}

/* Some helper functions that do most of the work */

/**
 * Adjust the rows property of a text element to fit the content.
 * @param {HTMLTextAreaElement} textArea The text area element to adjust.
 * @param {number} minRows The minimum number of rows to display.
 * @param {number} maxRows The maximum number of rows to display.
 */
function adjustTextAreaRows(textArea: HTMLTextAreaElement, minRows: number = 1, maxRows: number = 999): void {
  if (!(textArea instanceof HTMLTextAreaElement)) {
    return;
  }

  let textAreaStyle = window.getComputedStyle(textArea);
  let lineHeight = parseFloat(textAreaStyle.lineHeight);
  if (isNaN(lineHeight)) {
    // line spacing must be a text value like "normal", so force it to something we can calculate with.
    // most user agents use a default value of about 1.2em; See: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
    textArea.style.lineHeight = '1.2';
    textAreaStyle = window.getComputedStyle(textArea);
    lineHeight = parseFloat(textAreaStyle.lineHeight);
  }

  const vertPadding = parseFloat(textAreaStyle.paddingTop) + parseFloat(textAreaStyle.paddingBottom);
  const vertBorders = parseFloat(textAreaStyle.borderTopWidth) + parseFloat(textAreaStyle.borderBottomWidth);
  textArea.style.overflowY = 'hidden'; // Calculate without having to worry about the vertical scrollbar.
  textArea.style.height = '1px';  // Force the height to a very small value to get the correct scroll height.
  const rows = Math.round(Math.min(maxRows, Math.max(minRows, (textArea.scrollHeight - vertPadding) / lineHeight)));
  textArea.rows = rows;
  // We are setting the height because FireFox adds a row and edge/ie don't get it quite right.
  const heightInPixels = rows * lineHeight + vertPadding + vertBorders;

  /*console.log(
      `lineHeight: ${lineHeight}, rows: ${rows}, vertPadding: ${vertPadding}, vertBorders: ${vertBorders}, height: ${heightInPixels}, ${textAreaStyle.boxSizing}`);
      */
  textArea.style.height = `${heightInPixels}px`;
  textArea.style.overflowY = 'auto';
}
