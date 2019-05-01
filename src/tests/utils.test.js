/* eslint-disable */
import { findLinearRegression, calculateSSE } from '../utils.js';

describe('Unit tests for findLinearRegression and calculateSSE', () => {
    const DATA = [[1, 1], [2, 2], [3, 3]]
    test('Find Linear Regression', () => {
        let [slope, intercept] = findLinearRegression(DATA);
        expect(slope).toEqual(1);
        expect(intercept).toEqual(0);
    });

    test('calculateSSE', () => {
        let bestFitFunc = (x) => {return x;};
        let sse = calculateSSE(DATA, bestFitFunc);
        expect(sse).toEqual(0);
    });
});
