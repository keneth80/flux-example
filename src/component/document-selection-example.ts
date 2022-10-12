import { addEvent, removeEvent } from './state-store';
import { STATE_EVENT, STATE_EVENT_CODE } from './state-store/event-const';

export class DocumentSelectionExample {
    private numbers: Array<string> = [];

    constructor() {
        this.init();
    }

    init() {
        addEvent(STATE_EVENT.EVENT_TEMP_DATA_LIST, this.tempDataList);
        addEvent(STATE_EVENT.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
    }

    selection() {
        (document.querySelector('#result') as HTMLElement).innerText =
            this.numbers.map((x) => x + ' = success').join(',');
    }

    destroy() {
        removeEvent(STATE_EVENT.EVENT_TEMP_DATA_LIST, this.tempDataList);
        removeEvent(STATE_EVENT.EVENT_TEMP_DATA_LIST2, this.tempDataList2);
    }

    tempDataList = (result: any) => {
        console.log('result : ', result);
        this.numbers = result;
        this.selection();
    };

    tempDataList2 = (result: any) => {
        console.log('result2 : ', result);
        this.numbers = result;
        this.selection();
    };
}
