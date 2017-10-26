/**
 * Created by neal.borelli on 4/19/2016.
 */

/**
 * A factory for creating a decorator that will log every call to a method by ding a console.info() call.
 * @returns {MethodDecorator} the method decorator that ill log the call
 */
export default function log(): MethodDecorator {
    return function(target: Function, key: string, descriptor: TypedPropertyDescriptor<Function>)
        : TypedPropertyDescriptor<Function> {
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        var originalMethod = descriptor.value;

        // editing the descriptor/value parameter
        // NOTE: Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        descriptor.value =  function (...args: any[]) {
            let argsString = args.map(a => JSON.stringify(a)).join();
            // note usage of originalMethod here
            let result = originalMethod.apply(this, args);
            let resultString = JSON.stringify(result);
            console.info(`Call: ${key}(${argsString}) => ${resultString}`);
            return result;
        };

        // return edited descriptor as opposed to returning a new descriptor
        return descriptor;
    };
}
