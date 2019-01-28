var jStat = require('jStat').jStat;
import * as math from 'mathjs';

export const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

export const integerDivision = function(a, b) {
    let dividend = a / b;
    return dividend > 0 ? Math.floor(dividend) : Math.ceil(dividend);
};

export const createHistogramArray = (dist) => {
    const NO_OF_BINS = 13;
    let min = Math.min(...dist);
    let max = Math.max(...dist);
    let bin_size = math.round((max - min) / NO_OF_BINS, 1);

    // Bin Indicies meaning the first value in each bin
    // Creates a list of the form [bin_idx, some val]
    // - where bin_idx is an increasing multiple of the bin size
    // starting from the min value;
    // - where some val is the frequency of a value falling into that bin
    let bin_indices = [...Array(NO_OF_BINS).keys()].reduce(
        (acc, val) => {
            acc.push([math.round(min + (bin_size * val), 1), 0]);
            return acc;
        },
        []);

    return jStat.histogram(dist, NO_OF_BINS).reduce(
        (acc, val, idx) => {
            acc[idx][1] = val;
            return acc;
        },
        bin_indices
    );
};

export const getDomain = (hist) => {
    let domain = hist.map((e) => e[0]);
    return [
        Math.min(...domain),
        Math.max(...domain)];
};

export const getHistogramMaxima = (hist) => {
    return Math.max(...hist.map((e) => e[1]));
};

export const interpolateHistogram = (hist) => {
    // The function fills in data with values less than the
    // original histogram value.
    return hist.reduce((acc, e) => {
        // [val, int]
        acc.push(e);
        if (e[1] > 1) {
            math.range(1, e[1]).map((i) => {
                acc.push([e[0], i]);
            });
        }
        return acc;
    }, []);
};

