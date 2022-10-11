export * from './event-action-map';
import { EventDispatcher } from './event-dispatcher';

export const dispatchEventByAction = <T = any>(event: string, param?: T) => {
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
