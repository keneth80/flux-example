import './style.css';

import { DocumentSelectionExample } from './component/document-selection-example';
import { BasicChart } from './component/basic-chart';
import { VerticalBarSeries } from './component/series/vertical-bar-series';

class SalesModel {
    salesperson: string;
    sales: number;

    constructor(
        salesperson: string,
        sales: number
    ) {
        Object.assign(this, {
            salesperson,
            sales
        });
    }

    static clone({
        salesperson,
        sales
    }): SalesModel {
        return new SalesModel(salesperson, sales);
    }
}

const data: Array<SalesModel> = [
    new SalesModel('Bob', 33),
    new SalesModel('Robin', 12),
    new SalesModel('Anne', 41),
    new SalesModel('Mark', 16),
    new SalesModel('Joe', 59),
    new SalesModel('Eve', 38),
    new SalesModel('Karen', 21),
    new SalesModel('Kirsty', 25),
    new SalesModel('Chris', 30),
    new SalesModel('Lisa', 47),
    new SalesModel('Tom', 5),
    new SalesModel('Stacy', 20),
    new SalesModel('Charles', 13),
    new SalesModel('Mary', 29)
];

const excute = () => {
    const basicChart: BasicChart = new BasicChart({
        selector: '#chart',
        calcField: 'sales',
        data: data,
        axes: [
            {
                field: 'salesperson',
                type: 'string',
                placement: 'bottom',
                padding: 0.2
            },
            {
                field: 'sales',
                type: 'number',
                placement: 'left'
            },
        ],
        series: [
            new VerticalBarSeries()
        ]
    }).draw();
};

excute();