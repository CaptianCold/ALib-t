/**
 * A class that will periodically call all of the callbacks that have been registered with it.
 * Created by neal.borelli on 8/3/2016.
 */
export class IntervalDispatcher {
    private _callbackFunctions: Array<() => any> = [];

    /**
     * @constructor
     * @param _sleepInterval The number of milliseconds to sleep between dispatches.
     * @param _removeAfterCall Specifies whether to remove a callback automatically once it has been called.
     */
    constructor(private _sleepInterval: number, private _removeAfterCall) {
        this._dispatchLoop();
    }

    /**
     * Schedules a callback the next time the dispatcher dispatches calls.
     * @param handler The callback handler
     * @returns {()=>undefined} A function for removing the callback from the callback list.
     */
    requestCallback(handler: () => any): () => void {
        let index = this._callbackFunctions.indexOf(handler);
        if (index === -1) {
            this._callbackFunctions.push(handler);
        }

        return () => {
            let index = this._callbackFunctions.indexOf(handler);
            if (index >= 0) {
                this._callbackFunctions.splice(index, 1);
            }
        };
    }

    /**
     * The dispatcher loop.
     * @private
     */
    private _dispatchLoop(): void {
        let callbacks = this._callbackFunctions.slice(0);  // clone array to start.
        //console.info(`callback count=${callbacks.length}`);
        callbacks.forEach(cb => {
            try {
                cb();
            } catch(err) {
                console.error(err);
            }

            if (this._removeAfterCall) {
                let index = this._callbackFunctions.indexOf(cb);
                if (index >= 0) {
                    this._callbackFunctions.splice(index, 1);
                }
            }
        });

        window.setTimeout(() => this._dispatchLoop(), this._sleepInterval);
    }
}
