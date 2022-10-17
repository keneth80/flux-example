import { addEvent, removeEvent } from './state-store';
import { dispatchEventByAction } from './state-store';
import { STATE_EVENTS } from './state-store/event-const';

export class BodyComponent {
    private numbers: Array<string> = [];

    constructor() {
        this.init();
    }

    init() {
        // action에 대한 이벤트 리스닝
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST3, this.tempDataList3);

        // data call을 위한 이벤트 발생 부
        document.getElementById('btn').addEventListener('click', () => {
            dispatchEventByAction(STATE_EVENTS.EVENT_TEMP_DATA_LIST);
        });
        document.getElementById('btn2').addEventListener('click', () => {
            dispatchEventByAction(STATE_EVENTS.EVENT_TEMP_DATA_LIST2);
        });
        document.getElementById('btn3').addEventListener('click', () => {
            dispatchEventByAction<{ data: Array<string> }>(
                STATE_EVENTS.EVENT_TEMP_DATA_LIST3,
                {
                    data: ['param1', 'param2', 'param3'],
                }
            );
        });
    }

    selection() {
        (document.querySelector('#result') as HTMLElement).innerText =
            this.numbers.map((x) => x + ' = success').join(',');
    }

    destroy() {
        // 이벤트 해제
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST3, this.tempDataList3);
    }

    // action에 대한 event callback
    tempDataList = (result: any) => {
        this.numbers = result;
        this.selection();
    };

    tempDataList2 = (result: any) => {
        this.numbers = result;
        this.selection();
    };

    tempDataList3 = (result: any, param: any) => {
        this.numbers = param.data;
        this.selection();
    };
}
