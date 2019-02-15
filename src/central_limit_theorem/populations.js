// This contains methods for generating the perfect, theoretical histogram
// for a given population.

function GetZPercent(z) {
    if (z < -6.5) {
        return 0.0;
    } else if (z > 6.5) {
        return 1.0;
    }
    let factK = 1;
    let sum = 0;
    let term = 1;
    let k = 0;
    let loopStop = Math.exp(-23);
    while(Math.abs(term) > loopStop) {
        /* eslint-disable-next-line */
        term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
        sum += term;
        k++;
        factK *= k;
    }
    sum += 0.5;
    return sum;
}

export const normalBarHeight = (intervals, mu, sigma) => {
    /* @intervals = An array of the values of the intervals to fill
     * @mu = mean of the normal distribution
     * @sigma = standard deviation of the normal ditribution
     *
     * returns an array of values [0, 1] that illustrate a theoritically
     * perfect normal distribution
     */
    let mean = mu || 0.0;
    let sd = sigma || 1.0;

    const SCALING_FACTOR = 0.341344746067521438;
    return [...Array(intervals.length - 1)].map((val, idx) => {
        let barMinZ = (intervals[idx] - mean) / sd;
        let barMaxZ = (intervals[idx + 1] - mean) / sd;
        return (GetZPercent(barMaxZ) - GetZPercent(barMinZ)) / SCALING_FACTOR;
    });
};

export const exponentialBarHeight = (intervals, mu, sigma) => {
    /* @intervals = An array of the values of the intervals to fill
     * @mu = mean of the normal distribution
     * @sigma = standard deviation of the normal ditribution
     *
     * returns an array of values [0, 1] that illustrate a theoritically
     * perfect exponential distribution
     */
    let mean = mu || 0.0;
    let sd = sigma || 1.0;

    const SCALING_FACTOR = 0.6321205588285577;
    intervals = intervals.map((val) => {
        return val < mean - sd ? mean - sd : val;
    });
    return [...Array(intervals.length - 1)].map((val, idx) => {
        return (1 - Math.exp(-1 / sd * (intervals[idx + 1] - mean + sd)) -
                (1 - Math.exp(-1 / sd * (intervals[idx] - mean + sd)))) /
                    SCALING_FACTOR;
    });
};
