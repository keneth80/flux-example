import './main-style.css';
import { DocumentSelectionExample } from './component/document-selection-example';
import { addAction } from './component/state-store';
import { dispatchEventByAction } from './component/state-store';
import { STATE_EVENTS } from './component/state-store/event-const';

const actionInit = () => {
    addAction(STATE_EVENTS.EVENT_TEMP_DATA_LIST, () => {
        const result = [];
        for (let i = 1; i < 21; i++) {
            result.push('number.' + i);
        }
        return result;
    });
    addAction(STATE_EVENTS.EVENT_TEMP_DATA_LIST2, () => {
        const result = [];
        for (let i = 1; i < 101; i++) {
            result.push('number.' + i);
        }
        return result;
    });
};

const drawViewTemplate = (data: any[]) => {
    const iuComponent = new DocumentSelectionExample();
};

const excute = () => {
    actionInit();
    drawViewTemplate([]);
    const button = document
        .getElementById('btn')
        .addEventListener('click', () => {
            dispatchEventByAction('temp_data_list2');
        });
};

excute();
