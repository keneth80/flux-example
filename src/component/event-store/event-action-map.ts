import { EventDispatcher } from './event-dispatcher';

export class EventActionMap {
    public static instance: EventActionMap;

    private _dispatcher: EventDispatcher;

    public get dispatcher(): EventDispatcher {
        return this._dispatcher;
    }

    constructor() {
        this._dispatcher = new EventDispatcher();
    }

    public static getInstance(): EventActionMap {
        return !EventActionMap.instance
            ? (EventActionMap.instance = new EventActionMap())
            : EventActionMap.instance;
    }
}

const eventActionMap: EventActionMap = EventActionMap.getInstance();

export const addAction = (action: string, func: any): void => {
    if (!eventActionMap.dispatcher.store[action]) {
        eventActionMap.dispatcher.store[action] = {
            data: {},
            action: func,
            receivers: [],
        };
    } else {
        eventActionMap.dispatcher.store[action].action = func;
    }
};

export const addEvent = (action: string, func: any): void => {
    if (!eventActionMap.dispatcher.store[action]) {
        eventActionMap.dispatcher.store[action] = {
            data: {},
            receivers: [],
        };
    }
    const funcList: Array<any> = eventActionMap.dispatcher.store[action]
        .receivers as Array<any>;
    if (!funcList.some((x) => x === func)) {
        funcList.push(func);
    }
};

export const removeEvent = (action: string, event: any): void => {
    if (eventActionMap.dispatcher.store[action] === null) return;
    const funcList: Array<any> = eventActionMap.dispatcher.store[action]
        .receivers as Array<any>;
    for (let i = 0; i < funcList.length; i++) {
        if (funcList[i] === event) {
            funcList.splice(i, 1);
            return;
        }
    }
};

export const removeAction = (action: string): void => {
    if (eventActionMap.dispatcher.store[action] === null) return;
    const funcList: Array<any> = eventActionMap.dispatcher.store[action]
        .receivers as Array<any>;
    funcList.length = 0;
    eventActionMap.dispatcher.store[action] = null;
};

export const clearActionAll = (): void => {
    for (const action in eventActionMap.dispatcher.store) {
        if (eventActionMap.dispatcher.store.hasOwnProperty(action)) {
            removeAction(action);
        }
    }
};
