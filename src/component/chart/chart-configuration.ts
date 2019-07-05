import { ISeries } from "./series.interface";

export interface Axis {
    field: any; // data propertie
    type: string; // default: number, option: number or string => number: linear, string: scale band for range
    placement: string; // position
    domain?: Array<any>;
    padding?: number;
}

export interface Margin {
    top: number;

    left: number;

    bottom: number;

    right: number;
}

export interface ChartConfiguration<T = any> {
    selector: string;

    margin?: Margin;

    axes?: Array<Axis>;

    series?: Array<ISeries<T>>;

    data: T;

    min?: number, // only type is number

    max?: number  // only type is number

    calcField?: string; // for only min max configration
}