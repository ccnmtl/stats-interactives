import * as math from 'mathjs';

const NO_OF_BINS = 36;
const MIN_BIN = -18;
const MAX_BIN = 18;

export const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

export const getMaxFrequency = (values) => {
    let hist = values.reduce((acc, val) => {
        if (acc.has(val)) {
            acc.set(val, acc.get(val) + 1);
        } else {
            acc.set(val, 1);
        }
        return acc;
    }, new Map());

    return Math.max(...hist.values());
};

const getBinIndices = (nBins, binSize, initVal) => {
    // Bin Indicies meaning the first value in each bin
    // Creates a list of the form [bin_idx, some val]
    // - where bin_idx is an increasing multiple of the bin size
    // starting from the min value;
    // - where some val is the frequency of a value falling into that bin
    return [...Array(nBins).keys()].reduce(
        (acc, val) => {
            acc.push([math.round(initVal + (binSize * val), 3), 0]);
            return acc;
        },
        []);
};

const getBinnedValues = (values, nBins, binSize, initVal) => {
    /* @values  an array of the values to bin
       @nBins   number of bins
       @binSize the size of each bin
       @initVal the minimum value in the array */

    // Map over the list of values and replace with the bin index
    // it should be placed into
    return values.reduce((acc, val) => {
        let idx = Math.floor((val - initVal) / binSize);
        // We want the range to be inclusive of the max value,
        // i.e.: when the max value is binned we want it to go in the
        // preceding bin, not into a new bin.
        if (idx >= 0 && idx < nBins) {
            acc.push(idx);
        }
        return acc;
    }, []);
};

export const createHistogramArray = (dist, bins, minum, maxum) => {
    let nBins = bins || NO_OF_BINS;
    let min = minum || MIN_BIN;
    let max = maxum || MAX_BIN;
    let bin_size = (max - min) / nBins;

    let bin_indices = getBinIndices(nBins, bin_size, min);
    let binned_values = getBinnedValues(dist, nBins, bin_size, min);

    return binned_values.reduce(
        (acc, val) => {
            acc[val][1] += 1;
            return acc;
        },
        bin_indices);
};

const getScatterBinnedValues = (values, nBins, binSize, initVal) => {
    /* @values  an array of the values to bin
       @nBins   number of bins
       @binSize the size of each bin
       @initVal the minimum value in the array */

    // Map over the list of values and replace with the bin index
    // it should be placed into
    return values.reduce((acc, val) => {
        let idx = Math.floor((val - initVal) / binSize);
        // An array of index and value is pushed, so that the orginal value
        // can map to a dot on the graph
        acc.push([idx, val]);
        return acc;
    }, []);
};

export const createScatterPlotHistogram = (samples, bins, minum, maxum) => {
    /* @samples An array of values to plot
     * @bins    The number of bins
     * @minum   The smallest number that the bins should align to
     * @maxum   The largest number that bins should align to */

    // Creates an 'ordered' histogram, where each value is
    // represented in the histogram rather than accumulated;
    // and where each value is inserted in the order of the passed array
    let nBins = bins;
    let min = minum;
    let max = maxum;
    let binSize = (max - min) / nBins;

    let flatBinIndicies = getBinIndices(nBins, binSize, min).map((e) => e[0]);
    let binned_values = getScatterBinnedValues(samples, nBins, binSize, min);

    return binned_values.reduce((acc, val) => {
        // For each binned_value find the greatest frequency in the accumulator
        // up to that point.
        let maxFreq = 0;
        let bin = flatBinIndicies[val[0]];
        acc.map((v) => {
            if (v[0] === bin) {
                maxFreq += 1;
            }
        });
        // Then push an incremented list to the accumulator
        acc.push([bin, maxFreq + 1, val[1]]);
        return acc;
    }, []);
};

export const getHistogramMaxima = (hist) => {
    return Math.max(...hist.map((e) => e[1]));
};

export const findLinearRegression = (data) => {
    // Per wikipedia:
    // https://en.wikipedia.org/wiki/Ordinary_least_squares#Simple_linear_regression_model
    let len = data.length;
    let sumXY = data.reduce((acc, val) => {
        acc += val[0] * val[1];
        return acc;
    }, 0);

    let sumX = data.reduce((acc, val) => {
        acc += val[0];
        return acc;
    }, 0);

    let sumY = data.reduce((acc, val) => {
        acc += val[1];
        return acc;
    }, 0);

    let powX = data.reduce((acc, val) => {
        acc += val[0] * val[0];
        return acc;
    }, 0);

    let beta = (
        (sumXY - (1/len * sumX * sumY)) / (powX - (1/len * sumX * sumX))
    );

    let alpha = (sumY / len) - (beta * (sumX / len));

    return [beta, alpha];
};

export const calculateSSE = (data, func) => {
    return data.reduce((acc, val) => {
        let squaredErr = Math.pow(val[1] - func(val[0]), 2);
        acc += squaredErr;
        return acc;
    }, 0);
};

export const unpackData = (data, index) => {
    // takes a 2D matrix and unpacks the given index
    // returns a flattened array
    return data.map((val) => {return val[index];});
};
