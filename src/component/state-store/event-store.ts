export interface StoreMap {
    [key: string]: {
        data: any;
        action?: any;
        receivers: Array<any>;
    };
}

// event map을 저장하고 있는 instance
class EventStore {
    public static instance: EventStore;

    private _data: StoreMap;

    public get data() {
        return this._data;
    }

    constructor() {
        this._data = {};
    }

    public static getInstance(): EventStore {
        return !EventStore.instance
            ? (EventStore.instance = new EventStore())
            : EventStore.instance;
    }
}

export const store: EventStore = EventStore.getInstance();
