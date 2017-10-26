import { Component, Input, Output, EventEmitter, HostBinding, Renderer } from '@angular/core';
import {Observable} from 'rxjs/Observable';

interface Point {
    x: number;
    y: number;
}

/**
 * Splitter container component can be used for splitting panels with resize capability.
 @example

 <tf-split-container [isVertical]='true' [ratio]='0.3'> <br/>
    <div panel="1"> Hello </div><br/>
    <div panel="2"> World </div><br/>
 </tf-split-container><br/>
 */

@Component({
  selector: 'tf-split-container',
  templateUrl: './split-container.component.html',
  styleUrls: ['./split-container.component.scss']
})
export class SplitContainerComponent {
  private _ratio = 0.5;
  private _ratioChangeEmitter = new EventEmitter<number>();

  @Input() public splitterSize = 6;

  @HostBinding('class.vertical')
  @Input() public isVertical = false;
  @Input() public minPanel1: string = null;
  @Input() public minPanel2: string = null;

  /**
   * Event that is raised when the ratio changes
   */
  @Output() get ratioChange() : Observable<any>{
    return this._ratioChangeEmitter.asObservable();
  }

  public isDragging = false;
  private _globalListeners: Array<Function> = [];

  constructor(private _renderer: Renderer) {
  }

  @Input() public set ratio(value: number) {
    // Coerce the value to within range if needed
    value = Math.max(0, Math.min(1, value));
    if (value !== this._ratio) {
      this._ratio = value;
      this._ratioChangeEmitter.emit(value);
    }
  }

  public get ratio(): number {
    return this._ratio;
  }

  @HostBinding('class.horizontal')
  private get _isHorizontal(): boolean {
    return !this.isVertical;
  }

  private _getClientPointFromEvent(event: MouseEvent | TouchEvent): Point | null {
    if (event instanceof MouseEvent) {
        return { x: event.clientX, y: event.clientY };
    } else if (event instanceof TouchEvent) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else {
        return null;
    }
  }

  private _addGlobalListener(eventName: string, callback: Function) {
    this._globalListeners.push(this._renderer.listenGlobal('document', eventName, callback));
  }

  private _startDragging(startEvent: MouseEvent | TouchEvent): void {
    startEvent.preventDefault();
    const splitter: HTMLElement = startEvent.target as HTMLElement;
    this._addGlobalListener('mousemove', e => this._handleDragEvent(e, splitter));
    this._addGlobalListener('touchmove', e => this._handleDragEvent(e, splitter));
    this._addGlobalListener('mouseup', e => this._stopDragging());
    this._addGlobalListener('touchend', e => this._stopDragging());
    this._addGlobalListener('touchcancel', e => this._stopDragging());
    this.isDragging = true;
  }

  private _stopDragging(): void {
    this.isDragging = false;
    this._globalListeners.forEach(f => f());
    this._globalListeners = [];
  }

  private _handleDragEvent(event: MouseEvent | TouchEvent, splitter: Element) {
      if (!event || !splitter) {
        return;
      }

      event.preventDefault();
      const point = this._getClientPointFromEvent(event);
      const container = splitter.parentElement;
      const containerRect = container.getBoundingClientRect();

      this.ratio = this.isVertical
        ? (point.x - containerRect.left) / containerRect.width
        : (point.y - containerRect.top) / containerRect.height;
  }
}
