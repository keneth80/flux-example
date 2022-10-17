import { addEvent, removeEvent } from './state-store';
import { STATE_EVENTS } from './state-store/event-const';

export class BodyComponent {
    private numbers: Array<string> = [];

    constructor() {
        this.init();
    }

    init() {
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST3, this.tempDataList3);
    }

    selection() {
        (document.querySelector('#result') as HTMLElement).innerText =
            this.numbers.map((x) => x + ' = success').join(',');
    }

    destroy() {
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST3, this.tempDataList3);
    }

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
