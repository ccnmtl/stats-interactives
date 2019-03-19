/* Smoking Frequency Matrix
 *
 * This 3D matrix is composed of illustrative values that relate
 * the tax rate on cigarettes to the number of cigs a person
 * smokes in a day.
 *
 * There are some implicit values in this data structure:
 * - The rows relate to the tax rates in increasing order: 3%, 5%, 7%, 7.5%
 *   - Columns relate to a person
 *      - Each col contains:
 *        - The frequency one smokes, the floor of this value is the bin this
 *          data would fall into
 *        - The bin frequncy this data point would appear in a histogram */

export const SMOKING_FREQ = [
    [
        [19.15, 1],
        [20.04, 1],
        [21.04, 1],
        [21.06, 2],
        [22.13, 1],
        [22.04, 2],
        [22.7, 3],
        [23.02, 1],
        [23.1, 2],
        [23.12, 3],
        [23.62, 4],
        [23.65, 5],
        [24.03, 1],
        [24.22, 2],
        [24.67, 3],
        [25.05, 1],
        [25.51, 2],
        [26.08, 1],
        [26.45, 2],
        [27.01, 1],
    ],
    [
        [15.15, 1],
        [16.09, 1],
        [17.11, 1],
        [17.21, 2],
        [18.02, 1],
        [18.06, 2],
        [18.71, 3],
        [19.14, 1],
        [19.17, 2],
        [19.23, 3],
        [19.29, 4],
        [19.67, 5],
        [20.23, 1],
        [20.24, 2],
        [20.35, 3],
        [21.18, 1],
        [21.47, 2],
        [22.12, 1],
        [22.49, 2],
        [24.02, 1],
    ],
    [
        [11.11, 1],
        [12.12, 1],
        [13.05, 1],
        [13.23, 2],
        [14.16, 1],
        [14.36, 2],
        [15.02, 1],
        [15.08, 2],
        [15.35, 3],
        [15.42, 4],
        [15.56, 5],
        [15.65, 6],
        [16.09, 1],
        [16.2, 2],
        [16.24, 3],
        [17.04, 1],
        [17.06, 2],
        [18.1, 1],
        [18.17, 2],
        [19.13, 1],
    ],
    [
        [10.1, 1],
        [11.03, 1],
        [12.24, 1],
        [12.25, 2],
        [13.23, 1],
        [13.31, 2],
        [13.58, 3],
        [13.74, 4],
        [14.12, 1],
        [14.2, 2],
        [14.22, 3],
        [14.29, 4],
        [14.6, 5],
        [15.16, 1],
        [15.24, 2],
        [16.5, 1],
        [16.57, 2],
        [17.48, 1],
        [17.74, 2],
        [18.41, 1],
    ],
];
