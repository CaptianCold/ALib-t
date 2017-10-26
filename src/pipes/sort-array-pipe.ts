/**
 * Created by divya.raghunathan on 3/7/2016.
 */
import {Pipe, PipeTransform} from '@angular/core';

export module SortType {
    export const STRING_TYPE = 'string';
    export const NUM_TYPE = 'number';
    export const DATE_TYPE = 'date';
}

export module SortOrder {
    export const ASC = 'asc';
    export const DESC = 'desc';
}

export interface SortOptions {
    sortBy : string;
    orderBy ?: string;
    sortType ?: string;
}

/**
 * Pipe to sort an array of objects.
 * Takes a sortOptions object as argument which has the following fields :
 *   sortBy:'property name' => name of the object's property based on which the sorting should be done. Required field.
 *   orderBy: 'asc' or 'desc' => order of sorting. Optional. Default is ascending.
 *   sortType: 'string' or 'number' or 'date'  => type of the property. Optional. Default is string.
 * Usage:
 *   <.. *ngFor="#obj of objList | tfSortArray: sortOptions" ..>
 *
 * Example:
 *   <tf-landing-tile *ngFor="#profile of profiles | tfSortArray: sortOptions" [profile]="profile">
 *   </tf-landing-tile
 *   Where
 *   sortOptions = {sortBy:'createdDateFullString', orderBy: 'desc', sortType: 'date'}
 */
@Pipe({name: 'tfSortArray', pure: false})
export class SortArrayPipe implements PipeTransform {

    private _sortBy : string;
    private _orderBy : string = SortOrder.ASC;
    private _sortType : string = SortType.STRING_TYPE;

    transform(inputArray:Array<any>, args: SortOptions) : Array<any> {

        if(!args) {
            return inputArray;
        }

        let params: SortOptions = args;
        if(params) {
            this._parseParams(params);
            if(this._sortBy) {
                return this._sortList(inputArray);
            }
        }
        return inputArray;
    }

    private _parseParams(params : SortOptions):void {
        this._sortBy = params.sortBy;
        this._orderBy = params.orderBy ? params.orderBy : SortOrder.ASC;
        this._sortType = params.sortType ? params.sortType : SortType.STRING_TYPE;
    }

    private _sortList(inputArray:Array<any>):Array<any> {
        switch (this._sortType) {
            case SortType.STRING_TYPE : {
                return inputArray.sort((left,right) => this._sortFunctionString(left, right));
            }
            case SortType.DATE_TYPE : {
                return inputArray.sort((left,right) => this._sortFunctionDate(left, right));
            }
            case SortType.NUM_TYPE : {
                return inputArray.sort((left,right) => this._sortFunctionNumber(left, right));
            }
            default : {
                return inputArray.sort((left,right) => this._sortFunctionString(left, right));
            }
        }
    }

    // String compare function
    private _sortFunctionString (left:any, right:any):number {

        if(!left[this._sortBy] || !right[this._sortBy]) {
            return 0;
        }

        try {
            if(this._orderBy === SortOrder.ASC) {
                return left[this._sortBy].localeCompare(right[this._sortBy]);
            } else {
                return right[this._sortBy].localeCompare(left[this._sortBy]);
            }
        } catch(er){
            return 0;
        }

    }

    // Number compare function
    private _sortFunctionNumber (left:any, right:any) : number {
        if(!left[this._sortBy] || !right[this._sortBy]) {
            return 0;
        }

        if(this._orderBy === SortOrder.ASC) {
            return (left[this._sortBy] - right[this._sortBy]);
        } else {
            return (right[this._sortBy] - left[this._sortBy]);
        }

    }

    // Date comparison. Converts Date string to Date object and then compare.
    private _sortFunctionDate (left:any, right:any) : number {
        if(!left[this._sortBy] || !right[this._sortBy]) {
            return 0;
        }

        try {
            if(this._orderBy === SortOrder.ASC) {
                return (new Date(left[this._sortBy]).valueOf() - new Date(right[this._sortBy]).valueOf());
            } else {
                return (new Date(right[this._sortBy]).valueOf() - new Date(left[this._sortBy]).valueOf());
            }
        } catch(er) {
            return 0;
        }
    }
}




