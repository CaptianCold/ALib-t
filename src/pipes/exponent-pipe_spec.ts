/**
 * Created by neal.borelli on 4/14/2016.
 */

import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {ExponentPipe} from './exponent-pipe';

export function main() {
    function tryIt(input:number, fractionDigits?:number, expected?:string):void {
        let pipe = new ExponentPipe();

        if (expected === undefined) {
            expected = input.toExponential(fractionDigits);
        }

        let output = (fractionDigits === undefined) ? pipe.transform(input) : pipe.transform(input, [fractionDigits]);
        expect(output).toEqual(expected);
    }

    describe('ExponentPipe tests', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    ExponentPipe
                ]
            });
        });

        it('should be able to be constructed!', () => {
            let pipe = new ExponentPipe();
            expect(pipe).not.toBeNull();
        });

        it('should default to 2 decimal places if no argument is provided', () =>
            tryIt(1234, undefined, (1234).toExponential(2)));

        it('should only allow the argument to be between 0 and 20', () => {
            let input = 1234;
            tryIt(input, -5, input.toExponential(0));
            tryIt(input, 30, input.toExponential(20));
        });

        it('should handle really small numbers', () => tryIt(0.000000003456, 4));
        it('should handle really large numbers', () => tryIt(32423324341, 4));
        it('should handle negative numbers', () => tryIt(-766.54654654, 4));
        it('should handle NaN', () => tryIt(NaN));
        it('should handle Infinity', () => tryIt(Infinity));

        it('should work in a directive',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {

                        let fixture = TestBed.createComponent(TestComponent);
                        let value = 123.456;
                        fixture.componentInstance.value = value;
                        let expected = value.toExponential(2);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.innerText).toEqual(expected);
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    template: `{{value | tfExponent}}`
})
class TestComponent {
    public value: number = 123.456;
}
