// 데이터를 변경하는 이벤트에 대한 명시.
export const STATE_EVENTS = {
    EVENT_TEMP_DATA_LIST: 'temp_data_list',
    EVENT_TEMP_DATA_LIST2: 'temp_data_list2',
    EVENT_TEMP_DATA_LIST3: 'temp_data_list3',
} as const;

export type STATE_EVENT_CODE = typeof STATE_EVENTS[keyof typeof STATE_EVENTS];
