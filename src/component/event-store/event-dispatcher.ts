export interface StringMap {
    [key: string]: {
        data: any;
        action?: any;
        receivers: Array<any>;
    };
}

export class EventDispatcher {
    public static ACTION_STORE_EVENT = 'action_store_event';
    private _storeMap: StringMap;

    public get storeMap(): StringMap {
        return this._storeMap;
    }

    constructor() {
        this._storeMap = {};
        this.addStoreEvent();
    }

    addStoreEvent() {
        addEventListener(
            EventDispatcher.ACTION_STORE_EVENT,
            (event: any): void => {
                const currentAction = this.storeMap[event.detail.action];
                if (currentAction) {
                    // action 등록여부에 따라 실행 후 데이터를 저장.
                    const data = currentAction.action
                        ? currentAction.action(event.detail.param)
                        : undefined;
                    if (data) currentAction.data = data;
                    // 등록된 데이터를 리시버를 통해 view로 전달.
                    const funcList: Array<any> =
                        currentAction.receivers as Array<any>;
                    for (let i = 0; i < funcList.length; i++) {
                        funcList[i](currentAction.data);
                    }
                }
            }
        );
    }
}
