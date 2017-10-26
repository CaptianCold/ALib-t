import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

/**
 * Interface to a messenger message channel.
 */
export interface IMessageChannel<T extends Object> {
    /**
     * Gets the name of the message channel
     * @returns {string} The name of the message channel
     */
    name: string;

    /**
     * Gets the observable stream that can be subscribed to.
     * @returns {Observable<any>} the observable stream
     */
    stream: Observable<T>;

    /**
     * Publishes a new message onto the message stream
     * @param message The message to be published.
     */
    publish(message: T): void;
}

/**
 * Interface to a messenger service
 */
export interface IMessengerService {
    /**
     * Gets the array of channel names
     * @returns {Array<string>} The list of channel names
     */
    channelNames: Array<string>;

    /**
     * Gets a channel from the messenger.
     * @param channelName The name of the channel
     * @param createIfNotFound If true, will create the message channel if it has not already been created.
     * @returns {IMessageChannel<object>} The message channel instance.
     */
    getChannel<T extends Object>(channelName: string, createIfNotFound?: boolean): IMessageChannel<T>;
}

/**
 * Not exported, but this is the internal implementation of a message channel
 */
class MessageChannel<T extends Object> implements IMessageChannel<T> {
    private _subject: Subject<T> = new Subject<T>();

    constructor(private _channelName: string) {
        if (!_channelName || _channelName === '') {
            throw 'channel name must be specified.';
        }
    }

    get name(): string {
        return this._channelName;
    }

    get stream() : Observable<T> {
        //return this._subject['asObservable'] ? this._subject['asObservable']() : this._subject;
        return this._subject.asObservable();
    }

    public publish(message: T): void {
        if (message === null) {
            throw new Error('message must be specified.');
        }

        this._subject.next(message);
    }
}

/**
 * A publish/subscribe messaging system that can be used to publish messages to subscribers.
 * Please do not over use!
 */
@Injectable()
export class MessengerService implements IMessengerService {
    private _channels: Array<MessageChannel<Object>> = [];

    /**
     * Gets the array of channel names
     * @returns {Array<string>} The list of channel names
     */
    public get channelNames(): Array<string> {
        return this._channels.map(c => c.name);
    }

    /**
     * Gets a channel from the messenger.
     * @param channelName The name of the channel
     * @param createIfNotFound If true, will create the message channel if it has not already been created.
     * @returns {IMessageChannel<object>} The message channel instance.
     */
    public getChannel<T extends Object>(channelName: string, createIfNotFound: boolean = false): IMessageChannel<T> {
        let channel = <MessageChannel<T>>this._channels.find(c => c.name.toUpperCase() === channelName.toUpperCase());
        if (createIfNotFound && !channel) {
            //console.info(`Creating messenger channel "${channelName}".`);
            channel = new MessageChannel<T>(channelName);
            this._channels.push(channel);
        }

        return channel;
    }
}
