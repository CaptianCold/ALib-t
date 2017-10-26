/**
 * Created by neal.borelli on 5/4/2016.
 */

import {
    Component,
    Input,
    Output,
    HostListener,
    EventEmitter,
    OnChanges,
    DoCheck,
    ContentChild,
    IterableDiffers,
    TemplateRef,
    IterableDiffer
} from '@angular/core';

export interface LazyLoadEvent {
    startIndex: number;
    count: number;
}

@Component({
    selector: 'tf-data-scroller',
    template: `
    <ul class="item-list">
        <template ngFor [ngForOf]="_dataToRender" [ngForTemplate]="itemTemplate"> </template>
    </ul>
    `
})
/**
 * The DataScrollerComponent displays data with on demand loading using scroll.  It can just virtualize the child
 * elements that are created or raise an event when more records are needed (lazy load).
 */
export class DataScrollerComponent implements OnChanges, DoCheck {
    /**
     * The array of data items.
     */
    @Input() items: Array<any>;

    /**
     * The number of items to load each time more data is needed.
     * @type {number}
     */
    @Input() virtualSize: number = 20;

    /**
     * Indicates whether lazy loading should be used.
     * @type {boolean}
     */
    @Input() lazy: boolean = false;

    /**
     * Value that indicates the scroll threshold that should cause more items to be loaded.  Defaults to 0.9 (90%)
     * @type {number}
     */
    @Input() scrollThreshold: number = 0.9;

    /**
     * When lazy loading is enabled, this event is raised to indicate when to load more records.
     * @type {EventEmitter<LazyLoadEvent>}
     */
    @Output() onLazyLoad: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    protected _dataToRender: Array<any> = [];
    private _differ: IterableDiffer<any>;

    constructor(differs: IterableDiffers) {
        this._differ = differs.find([]).create(null);
    }

    /**
     * Gets a value indicating whether there are any items to render
     * @returns {boolean}
     */
    public get isEmpty():boolean {
        return !this._dataToRender || this._dataToRender.length === 0;
    }

    /**
     * Handles changes to any of the inputs.  If items collection reference changes or other configuration, just reload.
     */
    ngOnChanges():void {
        this._dataToRender = [];
        this._load();
    }

    /**
     * Overrides the default change detection algorithm to look for any kind of change to the items array including
     * elements being moved or replaces, items being added or removed, etc.
     */
    ngDoCheck():void {
        let changes = this._differ.diff(this.items);
        if(changes) {
            this._syncToItems();
        }
    }

    @HostListener('scroll', ['$event'])
    _handleScrollEvent(event: UIEvent): void {
        let element:Element = event.srcElement || <Element>event.target;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        let viewportHeight = element.clientHeight;
        if((scrollTop >= ((scrollHeight * this.scrollThreshold) - viewportHeight))) {
            this._load();
        }
    }

    /**
     * Called when a change to the items array is detected and we are not using lazy loading.
     * @private
     */
    private _syncToItems(): void {
        if (!Array.isArray(this.items)) {
            this._dataToRender = [];
        } else if (this.lazy) {
            this._dataToRender = this.items;
        } else {
            this._dataToRender = this.items.slice(0, Math.min(this.items.length, this._dataToRender.length));
        }
    }

    /**
     * Called when more items are needed.
     * @private
     */
    private _load():void {
        if(this.lazy) {
            this.onLazyLoad.emit({ startIndex: this._dataToRender.length, count: this.virtualSize });
        } else if (!Array.isArray(this.items)) {
            this._dataToRender = [];
        } else {
            let endIndex = Math.min(this.items.length, this._dataToRender.length + this.virtualSize);
            this._dataToRender = this.items.slice(0, endIndex);
        }
    }
}
