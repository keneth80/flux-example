import { addEvent, removeEvent } from './state-store';
import { STATE_EVENTS } from './state-store/event-const';

export class LeftComponent {
    private navItemList = [];
    private dataCount = 0;
    private leftLabel: HTMLElement;
    private navContainer: HTMLElement;

    constructor() {
        this.init();
    }

    init() {
        this.leftLabel = document.querySelector('#left-label') as HTMLElement;
        this.navContainer = document.querySelector('#nav-list') as HTMLElement;
        console.log('this.navContainer : ', this.navContainer);
        addEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
    }

    selection() {
        this.leftLabel.innerText = this.dataCount
            ? `Left (${this.dataCount})`
            : 'Left';
        const writeContent: Array<string> = [];
        for (let i = 0; i < this.navItemList.length; i++) {
            writeContent.push(
                `<li><a href="#">${this.navItemList[i]}</a></li>`
            );
        }
        (this.navContainer as any).innerHTML = writeContent.join('');
    }

    destroy() {
        removeEvent(STATE_EVENTS.EVENT_TEMP_DATA_LIST, this.tempDataList);
    }

    tempDataList = (result: Array<string>) => {
        this.navItemList = result;
        this.dataCount = result.length;
        this.selection();
    };
}
