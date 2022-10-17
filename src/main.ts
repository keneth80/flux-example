import './main-style.css';
import { TopComponent } from './component/top-component';
import { LeftComponent } from './component/left-component';
import { BodyComponent } from './component/body-component';
import { addAction } from './component/state-store';
import { STATE_EVENTS } from './component/state-store/event-const';

// 최초 action에 대한 설정
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

// html layout에 따른 템플릿 로딩
const drawViewTemplate = () => {
    new TopComponent();
    new LeftComponent();
    new BodyComponent();
};

// ui구동을 위한 함수 호출
const excute = () => {
    actionInit();
    drawViewTemplate();
};

excute();
