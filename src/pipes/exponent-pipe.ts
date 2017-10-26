/**
 * Created by neal.borelli on 4/14/2016.
 */

import {Pipe, PipeTransform} from '@angular/core';

/**
 * A pipe that converts a numeric value to exponential notation.
 */
@Pipe({
    name: 'tfExponent',
    pure: true
})
export class ExponentPipe implements PipeTransform {
    transform(value: number, args?: any[]): any {
        let fractionDigits: number = 2;
        if (args && args.length >= 1 && Number.isInteger(args[0])) {
            fractionDigits = Math.max(0, Math.min(20, args[0]));
        }

        // The simple way, but little control over formatting
        return value.toExponential(fractionDigits);

        /*
         // Do it all yourself and we could have more options for the formatting
         if (!Number.isFinite(value)) {
         return Number.NaN.toString();
         }

         let exponent: number = 0;
         let negative: boolean = false;
         if (value < 0) {
         negative = true;
         value = -value;
         }

         if (value === 0) {
         // do nothing
         } else if (value < 1) {
         while (value < 1) {
         --exponent;
         value *= 10;
         }
         } else {
         while (value > 10) {
         ++exponent;
         value /= 10;
         }
         }

         if (negative) value = -value;

         // string interpolation is fun!
         return `${value.toFixed(fractionDigits)}e${exponent>=0?'+':''}${exponent}`;
         */
    }
}
