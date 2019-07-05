import { min, max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select, event, Selection, BaseType, EnterElement } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

import { IChart } from './chart.interface';
import { ChartConfiguration, Axis, Margin } from './chart-configuration';
import { ISeries } from './series.interface';

export interface Scale {
    orinet: string;
    scale: any;
}

export class ChartBase implements IChart {

    protected data: Array<any> = [];

    protected scales: Array<Scale> = [];

    protected min: number = 0;

    protected max: number = Infinity;

    protected width: number;

    protected height: number;

    protected originalData: any;

    protected svg: Selection<BaseType, any, HTMLElement, any>;

    protected svgWidth: number = 0;

    protected svgHeight: number = 0;

    protected mainGroup: Selection<BaseType, any, HTMLElement, any>;

    protected xAxisGroup: Selection<BaseType, any, HTMLElement, any>;

    protected yAxisGroup: Selection<BaseType, any, HTMLElement, any>;

    protected seriesList: Array<ISeries> = [];

    protected margin: Margin = {
        top: 20, left: 30, bottom: 40, right: 20
    };

    constructor(
        private configuration: ChartConfiguration
    ) {
        this.bootstrap();
    }

    get chartData(): any {
        return this.data;
    }

    set chartData(value: any) {
        this.data = value;
    }

    bootstrap() {
        // initialize size setup
        if (this.configuration.margin) {
            Object.assign(this.margin, this.configuration.margin);
        }

        this.svg = select(this.configuration.selector);

        this.svgWidth = parseFloat(this.svg.style('width'));
        this.svgHeight = parseFloat(this.svg.style('height'));

        this.width = this.svgWidth - this.margin.left - this.margin.right,
        this.height = this.svgHeight - this.margin.top - this.margin.bottom;

        // data setup origin data 와 분리.
        this.data = this.setupData(this.configuration.data);

        let targetValues: Array<number> = undefined;

        // setup min value
        if (!this.configuration.min) {
            if (this.configuration.calcField) {
                targetValues = this.data.map((item: any) => parseFloat(item[this.configuration.calcField]));
            } else {
                new Error('please setup configuration calcField because min, max value');
            }

            this.min = min(targetValues);
        } else {
            this.min = this.configuration.min;
        }

        // setup max value
        if (!this.configuration.max) {
            if (!this.configuration.calcField) {
                new Error('please setup configuration calcField because min, max value')
            } else {
                if (!targetValues || !targetValues.length) {
                    targetValues = this.data.map((item: any) => parseFloat(item[this.configuration.calcField]));
                }
            }

            this.max = max(targetValues);
        } else {
            this.max = this.configuration.max;
        }

        this.scales = this.setupScale(this.configuration.axes);
        if (this.configuration.series) {
            this.seriesList = this.configuration.series;
        }
        
        this.makeContainer();
        this.addEventListner();
    }

    draw() {
        this.updateDisplay();

        return this;
    }

    destroy() {

    }

    protected makeContainer() {
        this.mainGroup = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.xAxisGroup = this.mainGroup.append('g')
            .attr('class', 'x-axis-group')
            .attr('transform', `translate(0, ${this.height})`);

        this.yAxisGroup = this.mainGroup.append('g')
            .attr('class', 'y-axis-group');
    }

    protected addEventListner() {

    }

    protected updateAxis() {
        this.xAxisGroup.call(
            axisBottom(this.scales.find((scale: Scale) => scale.orinet === 'bottom').scale)
        )

        this.yAxisGroup.call(
            axisLeft(this.scales.find((scale: Scale) => scale.orinet === 'left').scale)
        )
    }

    protected updateSeries() {
        if (this.seriesList && this.seriesList.length) {
            this.seriesList.map((series: ISeries) => {
                series.setSvgElement(this.svg, this.mainGroup);
                series.drawSeries(this.data, this.scales, this.width, this.height);
            });
        }
    }

    protected updateDisplay() {
        this.updateAxis();
        this.updateSeries();
    }

    protected setupData(data) {
        this.originalData = [...data];
        return data;
    }

    protected setupScale(axes: Array<Axis> = []): Array<{orinet:string, scale:any}> {
        const returnAxes: Array<{orinet:string, scale:any}> = [];
        axes.map((axis: Axis) => {
            let scale = null;
            if (axis.type === 'string') {
                scale = scaleBand().range([0, this.width]).padding(axis.padding ? +axis.padding : 0.1);
                if (axis.domain) {
                    scale.domain(axis.domain);
                } else {
                    scale.domain(
                        this.data.map((item: any) => item[axis.field])
                    );
                }
            } else {
                scale = scaleLinear().range(
                    [this.height, 0]
                );
                if (axis.domain) {
                    scale.domain(axis.domain);
                } else {
                    if (!this.max) {
                        this.max = max(this.data.map((item: any) => parseFloat(item[axis.field])));
                    }
                    scale.domain(
                        [this.min, this.max]
                    );
                }
            }

            returnAxes.push({
                orinet: axis.placement,
                scale 
            });
        });
        return returnAxes;
    }

    
}