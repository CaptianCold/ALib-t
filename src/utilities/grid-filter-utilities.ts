/**
 * Created by divya.raghunathan on 5/24/2016.
 */

/*
    ag-grid specific filter model for each property.
    filter field holds the filter value.
    For number filter type field ( corresponds to 'eq','lt','gt').
    For text filter type field (corresponds to 'contains','eq','startswith','endswith')
 */

export interface IFilterModelProperty {
    filter: string | number;
    type: string;
    isScientific : boolean;
}

export interface IFilterModel {
    [propName: string]: IFilterModelProperty;
}

export interface IFilterOperation {
    value : string | number;
    operator : string;
}

export interface IMinMaxRange {
    min : number;
    max : number;
}

// Supported filter operations
const EQUALS = `eq`;
const LESS_THAN  = `lt`;
const GREATER_THAN  = `gt`;
const GREATER_THAN_AND_EQUAL_TO  = `ge`;
const CONTAINS = `contains`;
const STARTS_WITH  = `startswith`;
const ENDS_WITH  = `endswith`;

// Unsupported filter operations
const NOTEQUALS = `notEquals`;
const NOTEQUAL = `notEqual`;
const NOTCONTAINS = `notContains`;
const LESSTHANOREQUAL = `lessThanOrEqual`;
const INRANGE = `inRange`
const GREATERTHANOREQUAL = `greaterThanOrEqual`;

// Other logical operators for api call
const YES = `yes`;
const NO = `no`;
const AND = `and`;



// Returns filter query param string (reference ODATA uri conventions).
// Space used as delimiter between fieldname, operator and value. Multiple sort columns separated using ',' delimiter.
// Eg of return string :- fieldname1 lt value, fieldname2 contains ‘text1’
export function createServerSideFilterUrlParam(filterModel : IFilterModel) : string {

    let propKeys : Array<any> = Object.keys(filterModel);
    if(!filterModel || !propKeys || propKeys.length ===0 ) {
        return '';
    }

    let res= ``;
    propKeys.forEach((propKey : string, idx : number) => {
        let item = filterModel[propKey];
        //Check for unsupported filter options
        if(item['type'] && !isFilterOptionSupported(item.type)) {
            throw new Error('Selected filter option not currently supported.');
        }

        // For custom made boolean filter models 'Yes' or 'No'
        if(Array.isArray(item) && (<any>item).length ==1) {
            res += `${propKeys[idx]} ${EQUALS} ${convertBooleanValues(item[0])}`;
        } else { // For text or number type filters
            let operators:Array<IFilterOperation> = mapToOperator(item.filter, item.type, item.isScientific);
            operators.forEach((filterOp, pos) => {
                if (filterOp.operator != ``) {
                    // surround with quotes for string
                    let value = (typeof item.filter == 'string') ? `\'${filterOp.value}\'` : `${filterOp.value}`;
                    res += `${propKeys[idx]} ${filterOp.operator} ${value}`;
                }
                // seperate each operator with 'and' for same property (in future this could be passed as in an args)
                if (pos < (operators.length - 1)) {
                    res += ` ${AND} `;
                }
            });
        }
        // Comma seperate each filter param
        if (idx < (propKeys.length - 1)) {
            res += `,`;
        }
    });
    return res;
}

function isFilterOptionSupported(filterKey : string) : boolean {

    if(!filterKey || filterKey.trim().length == 0) {
        return false;
    }


    if(filterKey === NOTEQUALS ||
        filterKey === NOTEQUAL ||
        filterKey === NOTCONTAINS ||
        filterKey === LESSTHANOREQUAL ||
        filterKey === INRANGE ||
        filterKey === GREATERTHANOREQUAL) {
        return false;
    }

    return true;
}

function convertBooleanValues(value : string) : number | string {
    if(value.toLowerCase() === NO) {
        return 0;
    } else if(value.toLowerCase() === YES) {
        return 1;
    }
    return value;
}

// Mapping the operator values based on ag-grid filter types
// For number filter returns 'eq' or 'lt' or 'gt'.
// For text filter returns 'contains' or 'eq' or 'startswith' or 'endswith'
function mapToOperator(value : string| number, type : string, isScientific : boolean = false) : Array<IFilterOperation> {

    let filterOps : Array<IFilterOperation> = [];

    if( typeof value === `string`) {
        return mapToOperatorForString(type , <string>value);
    } else if( typeof value === `number` && !Number.isNaN(<number>value) ) {
        if(isScientific) {
            return mapToOperatorForScientificNumerals(type, <number>value);
        } else {
            return mapToOperatorForNumbers(type, <number>value);
        }
    }
    return filterOps;
}

function mapToOperatorForString(type : string, value : string) : Array<IFilterOperation> {

    if(!type || (type.length == 0)) {
        return null;
    }

    if(type.toLowerCase().localeCompare(`contains`) === 0 ) {
        return [{value : value, operator : CONTAINS }];
    } else if ((type.toLowerCase().localeCompare(`equals`)) === 0) {
        return [{value : value, operator : EQUALS }];
    } else if ((type.toLowerCase().localeCompare(`startswith`)) === 0) {
        return [{value : value, operator : STARTS_WITH }];
    } else if ((type.toLowerCase().localeCompare(`endswith`)) === 0) {
        return [{value : value, operator : ENDS_WITH }];
    } else {
        return [{value : value, operator : CONTAINS }];
    }
}

function mapToOperatorForNumbers(type : string, value : number) : Array<IFilterOperation> {

    if(!type || (type.length == 0)) {
        return null;
    }

    if(type.toLowerCase().localeCompare(`equals`) === 0) {
        return [{value : value, operator : EQUALS }];
    } else if ((type.toLowerCase().localeCompare(`greaterthan`) === 0)) {
        return [{value : value, operator : GREATER_THAN }];
    } else if ((type.toLowerCase().localeCompare(`lessthan`)) === 0) {
        return [{value : value, operator : LESS_THAN }];
    } else {
        return null
    }

}

function mapToOperatorForScientificNumerals(type : string, value : number) : Array<IFilterOperation> {
    let minMaxRange : IMinMaxRange = null;

    if(!type || (type.length == 0)) {
        return null;
    }

    if(type.toLowerCase().localeCompare(`equals`) === 0) {
        minMaxRange = getMinAndMaxRangeForScientificNumber(<number> value, EQUALS);
        return [{value : minMaxRange.min , operator : GREATER_THAN_AND_EQUAL_TO},
                {value : minMaxRange.max , operator : LESS_THAN }];
    } else if ((type.toLowerCase().localeCompare(`lessthan`)) === 0) {
        minMaxRange = getMinAndMaxRangeForScientificNumber(<number> value, LESS_THAN);
        return [{value : minMaxRange.min, operator : LESS_THAN }];
    } else if ((type.toLowerCase().localeCompare(`greaterthan`) === 0)) {
        minMaxRange = getMinAndMaxRangeForScientificNumber(<number> value, GREATER_THAN);
        return [{value : minMaxRange.max , operator : GREATER_THAN }];
    }  else {
        return null
    }
}

function getMinAndMaxRangeForScientificNumber(input : number, operator : string) : IMinMaxRange {
    if(Number.isNaN(input)) {
        return null;
    }

    let expFormat = input.toExponential(2);
    let digitStr = expFormat.slice(0,expFormat.indexOf('e'));
    let expStr = expFormat.slice(expFormat.indexOf('e') );

    let min,max = 0;
    let minStr, maxStr, minResultStr, maxResultStr = '';

    switch (operator) {
        case EQUALS :
            minStr = (Number.parseFloat(digitStr) - 0.005).toPrecision(4);
            minResultStr = minStr.concat(expStr);
            min = Number.parseFloat(minResultStr);

            maxStr = (Number.parseFloat(digitStr) + 0.005).toPrecision(4);
            maxResultStr = maxStr.concat(expStr);
            max = Number.parseFloat(maxResultStr);
            return {min : min, max : max};
        case GREATER_THAN :
            maxStr = (Number.parseFloat(digitStr) + 0.0049).toPrecision(4);
            maxResultStr = maxStr.concat(expStr);
            max = Number.parseFloat(maxResultStr);
            return {min : null, max : max};
        case LESS_THAN :
            minStr = (Number.parseFloat(digitStr) - 0.005).toPrecision(4);
            minResultStr = minStr.concat(expStr);
            min = Number.parseFloat(minResultStr);
            return {min : min, max : null};
        default : return null;
    }
}
