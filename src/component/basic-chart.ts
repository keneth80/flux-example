import { ChartBase } from './chart/chart-base';
import { ChartConfiguration } from './chart/chart-configuration';

export class BasicChart extends ChartBase {
    constructor(configuration: ChartConfiguration) {
        super(configuration);
    }

    bootstrap() {
        super.bootstrap();
    }

    updateAxis() {
        super.updateAxis();
    }
}