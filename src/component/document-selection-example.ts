import { addEvent, removeEvent } from './event-store';

export class DocumentSelectionExample {
    private numbers: Array<string> = [];

    constructor() {
        this.init();
    }

    init() {
        addEvent('temp_data_list', this.tempDataList);
        addEvent('temp_data_list2', this.tempDataList2);
    }

    selection() {
        (document.querySelector('#result') as HTMLElement).innerText =
            this.numbers.map((x) => x + ' = success').join(',');
    }

    destroy() {
        removeEvent('temp_data_list', this.tempDataList);
        removeEvent('temp_data_list2', this.tempDataList2);
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
