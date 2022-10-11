import { addEvent } from './event-store';

export class DocumentSelectionExample {
    private numbers: Array<string> = [];

    constructor() {
        this.init();
    }

    init() {
        addEvent('temp_data_list', (result: any) => {
            console.log('result : ', result);
            this.numbers = result;
            this.selection();
        });
    }

    selection() {
        (document.querySelector('#result') as HTMLElement).innerText =
            this.numbers.map((x) => x + ' = success').join(',');
    }
}
