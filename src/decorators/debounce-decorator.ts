/**
 * Created by neal.borelli on 4/19/2016.
 */

export function createDebounceFunction(original: Function, milliseconds: number,
                                resultCallback?: (any) => void): (...a: Array<any>) => void {
    let timeoutHandle = 0;

    return function(...args: Array<any>): void {
        if (timeoutHandle) {
            window.clearTimeout(timeoutHandle);
        }
        timeoutHandle = window.setTimeout(() => {
            timeoutHandle = 0;
            let result = original.apply(this, args);
            if (resultCallback) {
                resultCallback(result);
            }
        }, milliseconds);
    };
}

/**
 * A factory for a method decorator that debounces the call to the method it is attached to.
 * NOTE: This should not be done on any method that returns a value! Use a Promise or Observable for this and debounce it
 * yourself.  This decorator will change the method so it has not return value (undefined)
 * @param milliseconds {number} The number of milliseconds to wait. Defaults to 300ms
 * @param resultCallback {(any) => void} An optional callback function for getting the result when the method is actually called
 * @returns {MethodDecorator} The method decorator
 */
export function debounce(milliseconds: number = 300, resultCallback?: (any) => void): MethodDecorator {
    return function(target: Function, key: string, descriptor: TypedPropertyDescriptor<Function>)
        : TypedPropertyDescriptor<Function> {
        descriptor.value = createDebounceFunction(descriptor.value, milliseconds, resultCallback);
        // return edited descriptor as opposed to returning a new descriptor
        return descriptor;
    };
}
