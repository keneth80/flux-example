import { addEvent, removeEvent } from './state-store';
import { STATE_EVENTS } from './state-store/event-const';

export class TopComponent {
    private dataCount = 0;
    private topLabel: HTMLElement;

    constructor() {
        this.init();
    }

    init() {
        this.topLabel = document.querySelector('#top-label') as HTMLElement;
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, this.tempDataList);
    }

    selection() {
        this.topLabel.innerText = this.dataCount
            ? `Top (${this.dataCount})`
            : 'Top';
    }

    destroy() {
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
    }

    tempDataList = (result: Array<string>) => {
        this.dataCount = result.length;
        this.selection();
    };
}
