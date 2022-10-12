export const STATE_EVENT = {
    EVENT_TEMP_DATA_LIST: 'temp_data_list',
    EVENT_TEMP_DATA_LIST2: 'temp_data_list2',
} as const;

export type STATE_EVENT_CODE = typeof STATE_EVENT[keyof typeof STATE_EVENT];
