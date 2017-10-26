/**
 * A cool little component that can be used for laying out panels. The content will be projected into the body
 * of the panel by default.  If you add the headerRight attribute of content it will be projected into the header
 *
 * @example
 *
 * <tf-flex-panel class="flex-col" caption="Profiles" [headerMessage]="titleMessage">
 *   <tf-search-box headerRight [(value)]="searchText"></tf-search-box>
 *   <button headerRight class="btn btn-default">Add</button>
 *   <div>This is the content of the panel</div>
 * </tf-flex-panel>
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'tf-flex-panel',
    styleUrls: ['./flex-panel.component.scss'],
    template: `
    <div class="panel flex-col" [ngClass]="isPrimary?'panel-primary':'panel-default'">
        <div class="panel-heading">
            <h3 class="panel-title pull-left" title="{{title}}">
                {{caption}}
                <span *ngIf="headerMessage" class="header-message">{{headerMessage}}</span>
            </h3>
            <div class="navbar navbar-right">
                <ng-content select="[headerRight]"></ng-content>
            </div>
        </div> 
        <div class="panel-body panel-container flex-col">
            <ng-content></ng-content>   
        </div>
        <div class="panel-footer" *ngIf="showFooter">
            <ng-content select="[footer]"></ng-content>
        </div>
    </div>
    `
})
/**
 * Encapsulation of Bootstrap panel that hides much of the boilerplate and uses content projection for
 * the header commands and content.
 */
export class FlexPanelComponent {
    /**
     * Gets or sets the caption for the panel header.
     * @type {string}
     */
    @Input() caption: string;

    /**
     * Gets or sets the Tooltip for the panel header.
     * @type {string}
     */
    @Input() title: string;

    /**
     * Gets or sets the message that is displayed right after the caption.
     * @type {string}
     */
    @Input() headerMessage: string;

    /**
     * Specifies whether the panel is a primary panel. Defaults to false.
     * @type {boolean}
     */
    @Input() isPrimary: boolean = false;

    /**
     * Specified whether the panel footer should be shown
     * @type {boolean}
     */
    @Input() showFooter:boolean = false;
}
