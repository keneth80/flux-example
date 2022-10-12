import { store } from './event-store';

export class EventDispatcher {
    public static ACTION_STORE_EVENT = 'action_store_event';

    constructor() {
        this.addStoreEvent();
    }

    private addStoreEvent() {
        addEventListener(EventDispatcher.ACTION_STORE_EVENT, this.executeEvent);
    }

    private executeEvent = ({ detail }: any): void => {
        const currentAction = store.data[detail.action];
        if (currentAction) {
            // action 등록여부에 따라 실행 후 데이터를 저장.
            const data = currentAction.action
                ? currentAction.action(detail.param)
                : undefined;
            if (data) currentAction.data = data;
            // 등록된 데이터를 리시버를 통해 view로 전달.
            const funcList: Array<any> = currentAction.receivers as Array<any>;
            for (let i = 0; i < funcList.length; i++) {
                funcList[i](currentAction.data, detail.param);
            }
        }
    };
}
