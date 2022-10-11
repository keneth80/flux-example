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

/*
모든 데이터는 중앙 허브인 dispatcher를 통해 흐른다. 
action은 dispatcher에게 action creator 메소드를 제공하는데 대부분의 action은 view에서의 사용자 상호작용에서 발생한다. 
dispatcher는 store를 등록하기 위한 콜백을 실행한 이후에 action을 모든 store로 전달한다. 
등록된 콜백을 활용해 store는 관리하고 있는 상태 중 어떤 액션이라도 관련이 있다면 전달해준다. 
store는 change 이벤트를 controller-views에게 알려주고 그 결과로 데이터 계층에서의 변화가 일어난다. 
Controller-views는 이 이벤트를 듣고 있다가 이벤트 핸들러가 있는 store에서 데이터를 다시 가져온다. 
controller-views는 스스로의 setState() 메소드를 호출하고 컴포넌트 트리에 속해 있는 자식 노드 모두를 다시 랜더링하게 한다.
*/

const excute = () => {
    actionInit();
    drawViewTemplate([]);
    setTimeout(() => {
        dispatchEventByAction('temp_data_list');
    }, 2000);
};

excute();
