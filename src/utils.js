import * as math from 'mathjs';

const NO_OF_BINS = 13;

export const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

const getBinIndices = (nBins, binSize, initVal) => {
    // Bin Indicies meaning the first value in each bin
    // Creates a list of the form [bin_idx, some val]
    // - where bin_idx is an increasing multiple of the bin size
    // starting from the min value;
    // - where some val is the frequency of a value falling into that bin
    return [...Array(nBins).keys()].reduce(
        (acc, val) => {
            acc.push([math.round(initVal + (binSize * val), 1), 0]);
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
    return values.map((val) => {
        let idx = Math.floor((val - initVal) / binSize);
        // We want the range to be inclusive of the max value,
        // i.e.: when the max value is binned we want it to go in the
        // preceding bin, not into a new bin.
        return Math.min(idx, nBins - 1);
    });
};

export const createHistogramArray = (dist, bins) => {
    let nBins = bins || NO_OF_BINS;
    let min = Math.min(...dist);
    let max = Math.max(...dist);
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

export const createScatterPlotHistogram = (samples, bins, minum, maxum) => {
    /* @samples An array of values to plot
     * @bins    The number of bins
     * @minum   The smallest number that the bins should align to
     * @maxum   The largest number that bins should align to */

    // Creates an 'ordered' histogram, where each value is
    // represented in the histogram rather than accumulated;
    // and where each value is inserted in the order of the passed array
    let nBins = bins || NO_OF_BINS;
    let min = minum;
    let max = maxum;
    let bin_size = (max - min) / nBins;

    let flatBinIndicies = getBinIndices(nBins, bin_size, min).map((e) => e[0]);
    let binned_values = getBinnedValues(samples, nBins, bin_size, min);

    return binned_values.reduce((acc, val) => {
        // For each binned_value find the greatest frequency in the accumulator
        // up to that point.
        let maxFreq = 0;
        let bin = flatBinIndicies[val];
        acc.map((v) => {
            if (v[0] === bin) {
                maxFreq += 1;
            }
        });
        // Then push an incremented list to the accumulator
        acc.push([bin, maxFreq + 1]);
        return acc;
    }, []);
};

export const getHistogramMaxima = (hist) => {
    return Math.max(...hist.map((e) => e[1]));
};
