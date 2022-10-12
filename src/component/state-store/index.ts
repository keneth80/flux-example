export * from './event-action-manager';
export * from './event-dispatcher';
export * from './event-store';
import { STATE_EVENT_CODE } from './event-const';
import { EventDispatcher } from './event-dispatcher';

export const dispatchEventByAction = <T = any>(
    event: STATE_EVENT_CODE,
    param?: T
) => {
    // Check if this event not exists
    dispatchEvent(
        new CustomEvent(EventDispatcher.ACTION_STORE_EVENT, {
            detail: {
                action: event,
                param,
            },
        })
    );
};
