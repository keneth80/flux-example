import './main-style.css';
import { DocumentSelectionExample } from './component/document-selection-example';
import { addAction } from './component/event-store';
import { dispatchEventByAction } from './component/event-store';

const actionInit = () => {
    addAction('temp_data_list', () => {
        const result = [];
        for (let i = 1; i < 21; i++) {
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
            dispatchEventByAction('temp_data_list');
        });
};

excute();
