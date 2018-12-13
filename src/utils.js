import * as math from 'mathjs';

export const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

export const createHistogramArray = (dist) => {
    let xSet = new Set(dist);

    // Build an array: [[val, 0], ...]
    // where 0 is an initial value for some val's frquency
    const setRedux = (acc, val) => {
        acc.push([val[0], 0]);
        return acc;
    };

    let xSetList = [...xSet.entries()].reduce(setRedux, new Array(0));

    const redux = (acc, val) => {
        // findVal needs to be declared each time to
        // create a closure with val
        let findVal = (el) => el[0] == val;
        let idx = acc.findIndex(findVal);
        // When an index is found, increase its frequency by one
        if (idx > -1) {
            acc[idx][1] += 1;
        }
        return acc;
    };

    return dist.reduce(redux, xSetList);
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

