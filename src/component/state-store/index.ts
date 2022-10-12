export * from './event-action-manager';
export * from './event-dispatcher';
export * from './event-store';
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
