/**
 * Created by divya.raghunathan on 2/12/2016.
 */

import {Component, Input} from '@angular/core';
import {BreadcrumbLink} from './breadcrumbs.service';

/**
 * Breadcrumb control to show the navigation.
 * Created breadcrumb links based on the input property list of breadcrumbLink.
 * Based on the properties set for each breadcrumb link, the breadcrumb
 * - Can be clickable with a route param assignment.
 * - Can be non clickable if no need to navigate.
 * - Adds an image in front of the text, if imgSrc is set for the bread crumb.
 *
 * BreadcrumbService can be used as the interface to add/delete/update breadcrumbs.
 *
 * @example
 *  <tf-breadcrumbs [breadcrumbLinks]="breadcrumbService.getBreadcrumbLinks()"></tf-breadcrumbs>
 */
@Component({
    selector: 'tf-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
    @Input() breadcrumbLinks: Array<BreadcrumbLink> = [];
}

