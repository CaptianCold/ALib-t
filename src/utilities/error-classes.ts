/**
 * Created by neal.borelli on 4/25/2016.
 */

/**
 * Base class implementation for errors that can be thrown (exceptions)
  */
export class ErrorClass implements Error {
    public message: string;

    constructor(message: string = '') {
        this.message = message;
    }

    get name(): string {
        return this.constructor['name'] || this.constructor.toString().match(/\w+/g)[1];
    }
}

export class InvalidArgumentException extends ErrorClass {
    constructor(message: string = '') {
        super(message);
    }
}

export class NullArgumentException extends InvalidArgumentException {
    constructor(public argumentName: string, message: string = '') {
        super(message || `Argument "${argumentName}" must be specified and cannot be null.`);
    }
}
