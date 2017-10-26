/**
 * Created by divya.raghunathan on 2/17/2016.
 */

import {Injectable} from '@angular/core';
//import {BreadcrumbLink} from './breadcrumb-link';

/**
 * Model class for breadcrumb link
 */

export interface IBreadcrumbLink {
  id : string;
  name : string;
  clickable ?: boolean;
  routeParams ?: Array<any>;
  imgSrc ?: string;
  clickHandler ?: () => any;
  showIcon ?: boolean;
}


export class BreadcrumbLink implements IBreadcrumbLink {

  constructor(public id : string,
              public name : string,
              public clickable ?: boolean,
              public routeParams ?: Array<any>,
              public imgSrc ?: string,
              public clickHandler ?: () => any,
              public showIcon ?: boolean
  ) {
    if (clickable === undefined) {
      this.clickable = false;
    }

    if (routeParams === undefined) {
      this.routeParams = [];
    }
  }
}


/**
 * Service to manage a breadcrumb links
 * - Add a new breadcrumb link to the list
 * - Remove an existing breadcrumb link from the list
 * - Retrieve all the breadcrumb links
 */
@Injectable()
export class BreadcrumbService {

  private _breadcrumbLinks : Array<BreadcrumbLink>;

  constructor() {
    this._breadcrumbLinks = [];
  }

  public getBreadcrumbLinks() : Array<BreadcrumbLink> {
    return this._breadcrumbLinks;
  }

  public appendBreadcrumbLink(newBreadcrumbLink : BreadcrumbLink): void {

    // Do not add the breadcrumb link if the following conditions occur
    if(!newBreadcrumbLink || (!newBreadcrumbLink.id) || (!newBreadcrumbLink.name)) {
      return;
    }

    let idx = this._checkIfAlreadyExists(newBreadcrumbLink.id);
    if(idx === -1) {
      this._breadcrumbLinks.push(newBreadcrumbLink);
    } else {
      this._breadcrumbLinks[idx] = newBreadcrumbLink;
    }

    return;
  }

  public appendBreadcrumbLinkAfter(newBreadcrumbLink : BreadcrumbLink, prevBreadcrumbId : string): void {

    // Do not add the breadcrumb link if the following conditions occur
    if(!newBreadcrumbLink || (!newBreadcrumbLink.id) || (!newBreadcrumbLink.name)) {
      return;
    }

    let idx = this._checkIfAlreadyExists(prevBreadcrumbId);
    if(idx > -1) {
      this._breadcrumbLinks.splice(idx+1, 0, newBreadcrumbLink);
    }
    return;
  }

  public removeBreadcrumbLink(id : string, startsWith : boolean = false) : void {

    let idx = this._checkIfAlreadyExists(id, startsWith);
    if(idx > -1) {
      this._breadcrumbLinks.splice(idx,1);
    }
  }

  public removeLastBreadcrumbLink() : void {
    if(this._breadcrumbLinks.length > 0) {
      this._breadcrumbLinks.splice(this._breadcrumbLinks.length-1,1);
    }
  }

  public updateBreadcrumbLink(id : string, newBreadcrumbLink : BreadcrumbLink) {
    let idx = this._checkIfAlreadyExists(id);
    if(idx > -1) {
      this._breadcrumbLinks[idx] = newBreadcrumbLink;
    }
  }

  private _checkIfAlreadyExists(id : string, startsWith : boolean = false) : number {
    let findIdx = -1;
    let findPredicate;

    if(startsWith) {
      findPredicate = (item : BreadcrumbLink) => {
        return item.id.startsWith(id);
      };
    } else {
      findPredicate = (item : BreadcrumbLink) => {
        return (item.id === id);
      };
    }

    findIdx = this._breadcrumbLinks.findIndex(findPredicate);
    return findIdx;
  }
}
