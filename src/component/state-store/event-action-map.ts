import { STATE_EVENT_CODE } from './event-const';
import { EventDispatcher } from './event-dispatcher';
import { store } from './event-store';

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

export const addAction = (action: STATE_EVENT_CODE, func: any): void => {
    if (!store.data[action]) {
        store.data[action] = {
            data: {},
            action: func,
            receivers: [],
        };
    } else {
        store.data[action].action = func;
    }
};

export const addEvent = (action: STATE_EVENT_CODE, func: any): void => {
    if (!store.data[action]) {
        store.data[action] = {
            data: {},
            receivers: [],
        };
    }
    const funcList: Array<any> = store.data[action].receivers as Array<any>;
    if (!funcList.some((x) => x === func)) {
        funcList.push(func);
    }
};

export const removeEvent = (action: STATE_EVENT_CODE, event: any): void => {
    if (store.data[action] === null) return;
    const funcList: Array<any> = store.data[action].receivers as Array<any>;
    for (let i = 0; i < funcList.length; i++) {
        if (funcList[i] === event) {
            funcList.splice(i, 1);
            return;
        }
    }
};

export const removeAction = (action: string): void => {
    if (store.data[action] === null) return;
    const funcList: Array<any> = store.data[action].receivers as Array<any>;
    funcList.length = 0;
    store.data[action] = null;
};

export const clearActionAll = (): void => {
    for (const action in store.data) {
        if (store.data.hasOwnProperty(action)) {
            removeAction(action);
        }
    }
};
