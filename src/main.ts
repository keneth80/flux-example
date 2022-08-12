import './main-style.css';

import { DocumentSelectionExample } from './component/document-selection-example';

const excute = () => {
    const macroCallback = () => console.log('macro task: called macro task timeout callback.');

    const microCallback = () => {
        console.log('micro task: called micro task queueMicrotask callback. first');
        console.log('micro task: called micro task queueMicrotask callback. second');
    };

    const microTimeoutCallback = () => setTimeout(() => console.log('micro settimeout'), 0);

    const promiseCallback = () => console.log('called Promise callback');
    
    queueMicrotask(microTimeoutCallback);
    setTimeout(macroCallback, 0);
    queueMicrotask(microCallback);
    Promise.resolve().then(() => promiseCallback());
};

excute();