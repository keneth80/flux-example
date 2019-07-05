import { Selection, BaseType } from 'd3-selection';
import { ISeries } from '../chart/series.interface';
import { Scale } from '../chart/chart-base';

export class VerticalBarSeries implements ISeries {
    protected svg: Selection<BaseType, any, HTMLElement, any>;

    protected mainGroup: Selection<BaseType, any, HTMLElement, any>;

    constructor() { }

    setSvgElement(svg: Selection<BaseType, any, HTMLElement, any>, 
                  mainGroup: Selection<BaseType, any, HTMLElement, any>) {
        this.svg = svg;
        this.mainGroup = mainGroup;
    }

    drawSeries(data: Array<any>, scales: Array<Scale>, width: number, height: number) {
        const x: any = scales.find((scale: Scale) => scale.orinet === 'bottom').scale;
        const y: any = scales.find((scale: Scale) => scale.orinet === 'left').scale;
        this.mainGroup.selectAll('.bar')
            .data(data)
            .join(
                (enter) => enter.append('rect').attr('class', 'bar'),
                (update) => update,
                (exit) => exit.remove
            )
            .attr('x', (d) => { return x(d.salesperson); })
            .attr('width', x.bandwidth())
            .attr('y', (d) => { return y(d.sales); })
            .attr('height', (d) => { return height - y(d.sales); });
    }
}