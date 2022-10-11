import { EventDispatcher } from './event-dispatcher';

export class EventActionMap {
    public static instance: EventActionMap;

    private _store: EventDispatcher;

    public get store(): EventDispatcher {
        return this._store;
    }

    constructor() {
        this._store = new EventDispatcher();
    }

    public static getInstance(): EventActionMap {
        return !EventActionMap.instance
            ? (EventActionMap.instance = new EventActionMap())
            : EventActionMap.instance;
    }
}

const eventActionMap: EventActionMap = EventActionMap.getInstance();

export const addAction = (action: string, func: any): void => {
    if (!eventActionMap.store.storeMap[action]) {
        eventActionMap.store.storeMap[action] = {
            data: {},
            action: func,
            receivers: [],
        };
    } else {
        eventActionMap.store.storeMap[action].action = func;
    }
};

export const addEvent = (action: string, func: any): void => {
    if (!eventActionMap.store.storeMap[action]) {
        eventActionMap.store.storeMap[action] = {
            data: {},
            receivers: [],
        };
    }
    const funcList: Array<any> = eventActionMap.store.storeMap[action]
        .receivers as Array<any>;
    if (!funcList.some((x) => x === func)) {
        funcList.push(func);
    }
};

export const removeEvent = (action: string, event: any): void => {
    if (eventActionMap.store.storeMap[action] === null) return;
    const funcList: Array<any> = eventActionMap.store.storeMap[action]
        .receivers as Array<any>;
    for (let i = 0; i < funcList.length; i++) {
        if (funcList[i] === event) {
            funcList.splice(i, 1);
            return;
        }
    }
};

export const removeAction = (action: string): void => {
    if (eventActionMap.store.storeMap[action] === null) return;
    const funcList: Array<any> = eventActionMap.store.storeMap[action]
        .receivers as Array<any>;
    funcList.length = 0;
    eventActionMap.store.storeMap[action] = null;
};

export const clearActionAll = (): void => {
    for (const action in eventActionMap.store.storeMap) {
        if (eventActionMap.store.storeMap.hasOwnProperty(action)) {
            removeAction(action);
        }
    }
};
