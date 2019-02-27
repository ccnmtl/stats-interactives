import { createScatterPlotHistogram } from '../utils';

export const THREE_PCT = [
    [3.0, 14.6],
    [3.0, 14.74],
    [3.0, 14.83],
    [3.0, 15.0],
    [3.0, 16.27],
    [3.0, 18.26],
    [3.0, 19.69],
    [3.0, 20.77],
    [3.0, 21.92],
    [3.0, 21.88],
    [3.0, 21.92],
    [3.0, 21.82],
    [3.0, 22.29],
    [3.0, 24.15],
    [3.0, 24.7],
    [3.0, 25.04],
    [3.0, 27.14],
    [3.0, 28.3],
    [3.0, 28.56],
    [3.0, 28.97],
    [3.0, 28.87],
    [3.0, 28.15],
    [3.0, 29.77],
];

export const FIVE_PCT = [
    [5.0, 14.48],
    [5.0, 14.62],
    [5.0, 15.95],
    [5.0, 16.27],
    [5.0, 16.28],
    [5.0, 16.34],
    [5.0, 16.91],
    [5.0, 17.34],
    [5.0, 17.81],
    [5.0, 17.98],
    [5.0, 18.55],
    [5.0, 18.65],
    [5.0, 18.78],
    [5.0, 19.13],
    [5.0, 19.19],
    [5.0, 19.89],
    [5.0, 20.19],
    [5.0, 20.48],
    [5.0, 20.93],
    [5.0, 21.05],
    [5.0, 21.61],
    [5.0, 22.42],
    [5.0, 23.25],
    [5.0, 23.45],
    [5.0, 23.75],
    [5.0, 23.95],
    [5.0, 25.32],
    [5.0, 25.6],
    [5.0, 25.71],
];

export const SEVEN_PCT = [
    [7.0, 8.14],
    [7.0, 11.32],
    [7.0, 11.45],
    [7.0, 12.46],
    [7.0, 12.8],
    [7.0, 13.03],
    [7.0, 13.36],
    [7.0, 14.19],
    [7.0, 14.28],
    [7.0, 14.63],
    [7.0, 14.74],
    [7.0, 15.1],
    [7.0, 15.48],
    [7.0, 15.75],
    [7.0, 16.11],
    [7.0, 16.75],
    [7.0, 16.92],
    [7.0, 17.64],
    [7.0, 18.94],
    [7.0, 19.15],
    [7.0, 19.25],
    [7.0, 19.42],
    [7.0, 20.7],
    [7.0, 21.19],
    [7.0, 21.49],
    [7.0, 23.35],
];

export const SEVEN_FIVE_PCT = [
    [7.5, 10.32],
    [7.5, 11.66],
    [7.5, 12.53],
    [7.5, 12.78],
    [7.5, 12.89],
    [7.5, 13.61],
    [7.5, 14.12],
    [7.5, 14.14],
    [7.5, 15.24],
    [7.5, 15.37],
    [7.5, 15.62],
    [7.5, 15],
    [7.5, 17.19],
    [7.5, 17.44],
    [7.5, 17.51],
    [7.5, 18.23],
    [7.5, 18.33],
    [7.5, 18.54],
    [7.5, 18.91],
    [7.5, 20.05],
    [7.5, 20.59],
    [7.5, 21.58],
];

export const TAX_RATE_DATA_LENGTH = THREE_PCT.length +
                                    FIVE_PCT.length +
                                    SEVEN_PCT.length +
                                    SEVEN_FIVE_PCT.length;

let three_pct_values = THREE_PCT.map((val) => {return val[1];});
let three_pct_min = Math.floor(Math.min(...three_pct_values));
let three_pct_max = Math.floor(Math.max(...three_pct_values)) + 1;
export const THREE_PCT_SCATTER = createScatterPlotHistogram(
    three_pct_values,
    three_pct_max - three_pct_min,
    three_pct_min,
    three_pct_max
);

let five_pct_values = FIVE_PCT.map((val) => {return val[1];});
let five_pct_min = Math.floor(Math.min(...five_pct_values));
let five_pct_max = Math.floor(Math.max(...five_pct_values)) + 1;
export const FIVE_PCT_SCATTER = createScatterPlotHistogram(
    five_pct_values,
    five_pct_max - five_pct_min,
    five_pct_min,
    five_pct_max
);

let seven_pct_values = SEVEN_PCT.map((val) => {return val[1];});
let seven_pct_min = Math.floor(Math.min(...seven_pct_values));
let seven_pct_max = Math.floor(Math.max(...seven_pct_values)) + 1;
export const SEVEN_PCT_SCATTER = createScatterPlotHistogram(
    seven_pct_values,
    seven_pct_max - seven_pct_min,
    seven_pct_min,
    seven_pct_max
);

let seven_five_pct_values = SEVEN_FIVE_PCT.map((val) => {return val[1];});
let seven_five_pct_min = Math.floor(Math.min(...seven_five_pct_values));
let seven_five_pct_max = Math.floor(Math.max(...seven_five_pct_values)) + 1;
export const SEVEN_FIVE_PCT_SCATTER = createScatterPlotHistogram(
    seven_five_pct_values,
    seven_five_pct_max - seven_five_pct_min,
    seven_five_pct_min,
    seven_five_pct_max
);
