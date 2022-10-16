import { store } from './event-store';

// data를 관리하고 리시버로 흘려보내는 event 중앙관리 instance
export class EventDispatcher {
    public static ACTION_STORE_EVENT = 'action_store_event';

    constructor() {
        this.addStoreEvent();
    }

    private addStoreEvent() {
        addEventListener(EventDispatcher.ACTION_STORE_EVENT, this.executeEvent as EventListener);
    }

    private executeEvent = ({ detail }: CustomEvent): void => {
        const currentAction = store.data[detail.action];
        if (currentAction) {
            // action 등록여부에 따라 실행 후 데이터를 저장.
            const data = currentAction.action
                ? currentAction.action(detail.param)
                : undefined;
            if (data) currentAction.data = data;
            // 등록된 데이터를 리시버를 통해 view로 전달.
            const funcList: Array<Function> =
                currentAction.receivers as Array<Function>;
            for (let i = 0; i < funcList.length; i++) {
                funcList[i](currentAction.data, detail.param);
            }
        }
    };
}
